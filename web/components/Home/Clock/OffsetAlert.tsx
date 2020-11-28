import { Button, Flex } from "@chakra-ui/react";
import React, { memo } from "react";
import { useConfig } from "../../../utils/configs";
import { trackEvent } from "../../../utils/umami";

const OffsetAlert = () => {
  const [offset, setOffset] = useConfig("offsetDays");

  if (!offset) {
    return null;
  }

  return (
    <Flex justify="center">
      <Button
        variant="link"
        fontSize="sm"
        fontWeight="bold"
        colorScheme="red"
        onClick={() => {
          setOffset(0);
          trackEvent("clock", "offsetReset");
        }}
      >
        Showing schedule in {offset >= 0 ? "+" : "-"}
        {Math.abs(offset)} day{Math.abs(offset) !== 1 && "s"}
      </Button>
    </Flex>
  );
};

export default memo(OffsetAlert);
