import React, { memo, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { WebData } from "../utils/api";
import { ConfigKeys, Configs, ConfigsContext, DefaultConfigs, SyncContext } from "../utils/configs";

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
    <ConfigsContext.Provider value={useMemo(() => [value, setValue], [value, setValue])}>
      {children}
    </ConfigsContext.Provider>
  );
};

const SynchronizedConfigsProvider = ({ initial, children }: { initial: WebData; children?: ReactNode }) => {
  const [value, setValue] = useState(() => ({ ...DefaultConfigs, ...initial.data }));
  const [token, setToken] = useState(initial.token);

  return (
    <ConfigsContext.Provider value={useMemo(() => [value, setValue], [value, setValue])}>
      <SyncContext.Provider value={useMemo(() => ({ enabled: true }), [])}>{children}</SyncContext.Provider>
    </ConfigsContext.Provider>
  );
};

export default memo(ConfigsProvider);
