import React, { memo } from "react";
import { Configs, useConfig } from "../../../configs";
import { trackEvent } from "../../../track";

const serverList: Configs["server"][] = ["America", "Europe", "Asia"];

const Server = () => {
  const [server, setServer] = useConfig("server");

  return (
    <strong
      className="cursor-pointer"
      onClick={() => {
        setServer(
          serverList[(serverList.indexOf(server) + 1) % serverList.length]
        );

        trackEvent("clock", "serverSwitch");
      }}
    >
      {server}
    </strong>
  );
};

export default memo(Server);
