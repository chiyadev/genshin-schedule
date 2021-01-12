import { Link, Tooltip } from "@chakra-ui/react";
import React, { memo } from "react";
import { ServerList, useConfig } from "../../../utils/configs";
import { trackEvent } from "../../../utils/umami";
import { useServerTimeZone } from "../../../utils/time";

const ServerText = () => {
  const [server, setServer] = useConfig("server");
  const timeZone = useServerTimeZone();

  return (
    <Tooltip label={`Switch server (UTC${timeZone >= 0 ? `+${timeZone}` : `${timeZone}`})`} closeOnClick={false}>
      <Link
        as="button"
        color="white"
        fontWeight="bold"
        onClick={() => {
          setServer(ServerList[(ServerList.indexOf(server) + 1) % ServerList.length]);
          trackEvent("clock", "serverSwitch");
        }}
      >
        {server}
      </Link>
    </Tooltip>
  );
};

export default memo(ServerText);
