import React, { memo, ReactNode, useCallback } from "react";
import { useLocalConfig } from "../configs";
import Core from "./core";

const Sync = ({ children }: { children?: ReactNode }) => {
  const [auth, setAuth] = useLocalConfig("auth");
  const reset = useCallback(() => setAuth(false), [setAuth]);

  return (
    <>
      {children}
      {auth && <Core key={auth.token} authToken={auth.token} reset={reset} />}
    </>
  );
};

export default memo(Sync);
