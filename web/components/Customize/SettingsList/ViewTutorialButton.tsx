import React, { memo } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { FaChalkboard } from "react-icons/fa";
import { useConfig } from "../../../utils/configs";
import { trackEvent } from "../../../utils/umami";

const ViewTutorialButton = () => {
  const [, setOpen] = useConfig("tutorial");

  return (
    <Button
      leftIcon={<Icon as={FaChalkboard} />}
      onClick={() => {
        setOpen(true);
        trackEvent("tutorial", "show");
      }}
    >
      View tutorial
    </Button>
  );
};

export default memo(ViewTutorialButton);
