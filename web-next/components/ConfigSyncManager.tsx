import { memo } from "react";
import { useSyncToken } from "../utils/sync";
import { useConfigs } from "../utils/configs";

const ConfigSyncManager = () => {
  const [configs] = useConfigs();
  const [token, setToken] = useSyncToken();

  return null;
};

export default memo(ConfigSyncManager);
