import React, { memo } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Button, Icon } from "@chakra-ui/react";

const BackButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      variant="link"
      colorScheme="black"
      size="sm"
      fontWeight="normal"
      leftIcon={<Icon as={FaAngleLeft} />}
      onClick={onClick}
    >
      Back
    </Button>
  );
};

export default memo(BackButton);
