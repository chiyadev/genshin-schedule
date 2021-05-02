import { Link, Tooltip } from "@chakra-ui/react";
import React, { memo } from "react";
import { ServerList, useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { useServerTimeZone } from "../../../utils/time";
import { FormattedMessage } from "react-intl";

const ServerText = () => {
  const [server, setServer] = useConfig("server");
  const timeZone = useServerTimeZone();

  return (
    <Tooltip
      label={
        <>
          <FormattedMessage id="switchServer" /> (<code>{timeZone}</code>)
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
        <FormattedMessage id={server} />
      </Link>
    </Tooltip>
  );
};

export default memo(ServerText);
