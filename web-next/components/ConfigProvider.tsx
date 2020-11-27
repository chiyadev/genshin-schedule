import React, { ContextType, memo, ReactNode, useMemo, useRef, useState } from "react";
import { WebData } from "../utils/api";
import { ConfigContext, DefaultConfigs } from "../utils/configs";
import { SyncContext } from "../utils/sync";
import ConfigSyncManager from "./ConfigSyncManager";

const ConfigProvider = ({ initial, children }: { initial: WebData | null; children?: ReactNode }) => {
  const [value, setValue] = useState(() => ({ ...DefaultConfigs, ...initial?.data }));
  const ref = useRef(value);
  const context: ContextType<typeof ConfigContext> = [value, setValue, ref];

  return (
    <ConfigContext.Provider value={useMemo(() => context, context)}>
      <SyncContext.Provider value={useState(initial?.token)}>
        <ConfigSyncManager />

        {children}
      </SyncContext.Provider>
    </ConfigContext.Provider>
  );
};

export default memo(ConfigProvider);
