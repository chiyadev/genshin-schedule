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
import { Config, ConfigContext, ConfigKeys, DefaultConfig, SyncContext } from "../utils/config";
import { MultiMap } from "../utils/multiMap";
import { PromiseSignal } from "../utils/promiseSignal";
import { createPatch, Patch } from "rfc6902";
import { useToast } from "@chakra-ui/react";
import { IntlProvider } from "react-intl";
import { Localizations } from "../langs";

const ConfigProvider = ({ initial, children }: { initial?: WebData | null; children?: ReactNode }) => {
  if (initial) {
    return <SynchronizedConfigProvider initial={initial}>{children}</SynchronizedConfigProvider>;
  } else {
    return <LocalConfigProvider>{children}</LocalConfigProvider>;
  }
};

function getLocalConfig(): Config {
  const result = { ...DefaultConfig };

  for (const key of ConfigKeys) {
    try {
      (result as any)[key] = JSON.parse(localStorage.getItem(key) || "");
    } catch {
      // ignored
    }
  }

  return result;
}

function setLocalConfig(config: Config) {
  for (const key of ConfigKeys) {
    const value = (config as any)[key];
    const defaultValue = (DefaultConfig as any)[key];

    if (value === defaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

const LocalConfigProvider = ({ children }: { children?: ReactNode }) => {
  const [value, setValueCore] = useState(DefaultConfig);
  const setValue = useCallback((newValue: SetStateAction<Config>) => {
    if (typeof newValue === "function") {
      newValue = newValue(getLocalConfig());
    }

    setValueCore(newValue);

    // propagate local changes to other tabs by writing to storage
    setLocalConfig(newValue);
  }, []);

  useEffect(() => {
    const updateState = () => setValueCore(getLocalConfig());

    // next.js requires server rendered markup to match the client side,
    // but since local config is stored in localStorage, it is not accessible from the server.
    // we use default config for the initial render, then set the correct config only on the client at the second frame
    updateState();

    // propagate changes from other tabs to local state without writing to storage
    window.addEventListener("storage", updateState);
    return () => window.removeEventListener("storage", updateState);
  }, []);

  return (
    <ConfigContextRoot value={value} setValue={setValue}>
      {children}
    </ConfigContextRoot>
  );
};

const SynchronizedConfigProvider = ({ initial, children }: { initial: WebData; children?: ReactNode }) => {
  const [value, setValue] = useState(() => ({ ...DefaultConfig, ...initial.data }));
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
              setValue((lastValue.current = { ...DefaultConfig, ...result.data }));
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
    <ConfigContextRoot value={value} setValue={setValue}>
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
    </ConfigContextRoot>
  );
};

const ConfigContextRoot = ({
  value,
  setValue,
  children,
}: {
  value: Config;
  setValue: Dispatch<SetStateAction<Config>>;
  children?: ReactNode;
}) => {
  const ref = useRef(value);

  const set = useCallback(
    (newValue: SetStateAction<Config>) => {
      setValue((value) => {
        if (typeof newValue === "function") {
          newValue = newValue(value);
        }

        return { ...DefaultConfig, ...newValue };
      });
    },
    [setValue]
  );

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
    <ConfigContext.Provider
      value={useMemo(
        () => ({
          ref,
          set,
          events,
        }),
        [ref, set, events]
      )}
    >
      <IntlProvider
        locale={value.language}
        messages={Localizations[value.language]}
        onError={() => {
          // ignore missing keys (untranslated database entries)
        }}
      >
        {children}
      </IntlProvider>
    </ConfigContext.Provider>
  );
};

export default memo(ConfigProvider);
