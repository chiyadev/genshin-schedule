import React, {
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createApiClient, WebData } from "../utils/api";
import { ConfigKeys, Configs, ConfigsContext, DefaultConfigs, SyncContext } from "../utils/configs";
import { MultiMap } from "../utils/multiMap";
import { PromiseSignal } from "../utils/promiseSignal";
import { createPatch, Patch } from "rfc6902";
import { useToast } from "@chakra-ui/react";

const ConfigsProvider = ({ initial, children }: { initial?: WebData | null; children?: ReactNode }) => {
  if (initial) {
    return <SynchronizedConfigsProvider initial={initial}>{children}</SynchronizedConfigsProvider>;
  } else {
    return <LocalConfigsProvider>{children}</LocalConfigsProvider>;
  }
};

function getLocalConfigs(): Configs {
  const result = { ...DefaultConfigs };

  for (const key of ConfigKeys) {
    try {
      (result as any)[key] = JSON.parse(localStorage.getItem(key) || "");
    } catch {
      // ignored
    }
  }

  return result;
}

function setLocalConfigs(configs: Configs) {
  for (const key of ConfigKeys) {
    const value = (configs as any)[key];
    const defaultValue = (DefaultConfigs as any)[key];

    if (value === defaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

const LocalConfigsProvider = ({ children }: { children?: ReactNode }) => {
  const [value, setValueCore] = useState(DefaultConfigs);
  const setValue = useCallback((newValue: SetStateAction<Configs>) => {
    if (typeof newValue === "function") {
      newValue = newValue(getLocalConfigs());
    }

    setValueCore(newValue);

    // propagate local changes to other tabs by writing to storage
    setLocalConfigs(newValue);
  }, []);

  useEffect(() => {
    const updateState = () => setValueCore(getLocalConfigs());

    // next.js requires server rendered markup to match the client side,
    // but since local config is stored in localStorage, it is not accessible from the server.
    // we use default config for the initial render, then set the correct config only on the client at the second frame
    updateState();

    // propagate changes from other tabs to local state without writing to storage
    window.addEventListener("storage", updateState);
    return () => window.removeEventListener("storage", updateState);
  }, []);

  return (
    <ConfigsContextRoot value={value} setValue={setValue}>
      {children}
    </ConfigsContextRoot>
  );
};

const SynchronizedConfigsProvider = ({ initial, children }: { initial: WebData; children?: ReactNode }) => {
  const [value, setValue] = useState(() => ({ ...DefaultConfigs, ...initial.data }));
  const [, setSync] = useState(false);

  const lastValue = useRef(initial.data);
  const patchQueue: Patch = useMemo(() => [], []);
  const patchTimeout = useRef<number>();

  const pushPatches = useCallback(() => {
    const patch = createPatch(lastValue.current, value);
    lastValue.current = value;
    patchQueue.push(...patch);
  }, [value]);

  useEffect(() => {
    clearTimeout(patchTimeout.current);
    patchTimeout.current = window.setTimeout(pushPatches, 200);
  }, [pushPatches]);

  const toast = useToast();
  const signals: PromiseSignal<void>[] = useMemo(() => [], []);
  const callbacks: Set<() => Promise<void>> = useMemo(() => new Set(), []);

  useEffect(() => {
    let mounted = true;
    let token = initial.token;

    (async () => {
      while (mounted) {
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (!patchQueue.length) {
          continue;
        }

        setSync(true);

        const callbackPromise = Promise.all(Array.from(callbacks).map((c) => c()));
        callbacks.clear();

        try {
          const patch = [...patchQueue];
          patchQueue.length = 0;

          const client = createApiClient();
          const result = await client.patchSync({ patch, token });

          switch (result.type) {
            case "success":
              token = result.token;
              break;

            case "failure":
              token = result.token;
              setValue((lastValue.current = { ...DefaultConfigs, ...result.data }));
              break;
          }

          await callbackPromise;

          signals.forEach((signal) => signal.resolve());
        } catch (e) {
          console.error(e);

          signals.forEach((signal) => signal.reject(e));

          toast({
            position: "top-right",
            status: "error",
            title: "Synchronization error",
            description: "Could not synchronize changes at the moment. Please try again later.",
            isClosable: true,
          });
        } finally {
          setSync(false);
          signals.length = 0;
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [signals, patchQueue]);

  return (
    <ConfigsContextRoot value={value} setValue={setValue}>
      <SyncContext.Provider
        value={useMemo(
          () => ({
            enabled: true,
            synchronize: () => {
              pushPatches();

              const signal = new PromiseSignal<void>();
              signals.push(signal);
              return signal.promise;
            },
            callbacks,
          }),
          [pushPatches, signals, callbacks]
        )}
      >
        {children}
      </SyncContext.Provider>
    </ConfigsContextRoot>
  );
};

const ConfigsContextRoot = ({
  value,
  setValue,
  children,
}: {
  value: Configs;
  setValue: Dispatch<SetStateAction<Configs>>;
  children?: ReactNode;
}) => {
  const ref = useRef(value);
  const events = useMemo(() => new MultiMap<string, () => void>(), []);

  useEffect(() => {
    const changes = ConfigKeys.filter((key) => {
      const previous = (ref.current as any)[key];
      const current = (value as any)[key];

      return previous !== current;
    });

    ref.current = value;

    for (const key of changes) {
      for (const callback of events.get(key)) {
        callback();
      }
    }
  }, [value, events]);

  return (
    <ConfigsContext.Provider
      value={useMemo(
        () => ({
          ref,
          set: setValue,
          events,
        }),
        [ref, setValue, events]
      )}
    >
      {children}
    </ConfigsContext.Provider>
  );
};

export default memo(ConfigsProvider);
