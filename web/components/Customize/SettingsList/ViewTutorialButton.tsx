import React, { memo } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { FaChalkboard } from "react-icons/fa";
import { useConfig } from "../../../utils/configs";

const ViewTutorialButton = () => {
  const [, setOpen] = useConfig("tutorial");

  return (
    <Button leftIcon={<Icon as={FaChalkboard} />} onClick={() => setOpen(true)}>
      View tutorial
    </Button>
  );
};

export default memo(ViewTutorialButton);
