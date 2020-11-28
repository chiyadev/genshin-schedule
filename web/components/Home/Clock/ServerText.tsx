import { Button } from "@chakra-ui/react";
import React, { memo } from "react";
import { ServerList, useConfig } from "../../../utils/configs";
import { trackEvent } from "../../../utils/umami";

const ServerText = () => {
  const [server, setServer] = useConfig("server");

  return (
    <Button
      variant="link"
      colorScheme="white"
      fontWeight="bold"
      verticalAlign="baseline"
      minW={0}
      onClick={() => {
        setServer(ServerList[(ServerList.indexOf(server) + 1) % ServerList.length]);
        trackEvent("clock", "serverSwitch");
      }}
    >
      {server}
    </Button>
  );
};

export default memo(ServerText);
