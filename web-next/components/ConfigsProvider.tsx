import React, {
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { WebData } from "../utils/api";
import { ConfigKeys, Configs, ConfigsContext, DefaultConfigs, SyncContext } from "../utils/configs";
import { MultiMap } from "../utils/multiMap";

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
  const [token, setToken] = useState(initial.token);

  return (
    <ConfigsContextRoot value={value} setValue={setValue}>
      <SyncContext.Provider value={useMemo(() => ({ enabled: true }), [])}>{children}</SyncContext.Provider>
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

  useLayoutEffect(() => {
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
