import React, { memo } from "react";
import { Configs, useConfig } from "../../../configs";

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
      }}
    >
      {server}
    </strong>
  );
};

export default memo(Server);
