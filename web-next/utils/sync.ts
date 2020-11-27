import { createContext, Dispatch, useContext } from "react";

export const SyncContext = createContext<[string | undefined, Dispatch<string | undefined>]>([undefined, () => {}]);

export function useSyncToken() {
  return useContext(SyncContext);
}
