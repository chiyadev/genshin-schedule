import React, { memo } from "react";
import { Box } from "@chakra-ui/layout";

const DiscordWidget = () => {
  return (
    <Box
      as="iframe"
      src="https://discord.com/widget?id=786573740875841566&theme=dark"
      frameBorder={0}
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
    />
  );
};

export default memo(DiscordWidget);
