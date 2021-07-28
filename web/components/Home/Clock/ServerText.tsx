import { Link, Tooltip } from "@chakra-ui/react";
import React, { memo } from "react";
import { ServerList, useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { useServerTimeZone } from "../../../utils/time";
import { FormattedMessage } from "react-intl";

const ServerText = () => {
  const [server, setServer] = useConfig("server");
  const timeZone = useServerTimeZone();

  let name: any;

  switch (server) {
    case "America":
      name = <FormattedMessage defaultMessage="America" />;
      break;

    case "Europe":
      name = <FormattedMessage defaultMessage="Europe" />;
      break;

    case "Asia":
      name = <FormattedMessage defaultMessage="Asia" />;
      break;

    case "TW, HK, MO":
      name = <FormattedMessage defaultMessage="TW, HK, MO" />;
      break;
  }

  return (
    <Tooltip
      label={
        <>
          <FormattedMessage defaultMessage="Switch server" /> (<code>{timeZone}</code>)
        </>
      }
      closeOnClick={false}
    >
      <Link
        as="button"
        fontWeight="bold"
        onClick={() => {
          setServer(ServerList[(ServerList.indexOf(server) + 1) % ServerList.length]);
          trackEvent("clock", "serverSwitch");
        }}
      >
        {name}
      </Link>
    </Tooltip>
  );
};

export default memo(ServerText);
