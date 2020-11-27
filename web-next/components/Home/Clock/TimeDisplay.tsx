import React, { memo } from "react";
import { useServerDate } from "../../../utils/time";
import { useConfig } from "../../../utils/configs";
import { trackEvent } from "../../../utils/umami";
import { Button, chakra, HStack } from "@chakra-ui/react";

const TimeDisplay = () => {
  const date = useServerDate();
  const [, setOffset] = useConfig("offsetDays");

  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  return (
    <HStack justify="center">
      <Button
        variant="link"
        fontWeight="bold"
        fontSize="4xl"
        colorScheme="white"
        onClick={() => {
          setOffset((o) => o - 1);
          trackEvent("clock", "offsetBackward");
        }}
      >
        &lt;
      </Button>

      <chakra.div fontWeight="bold" fontSize="4xl">
        <span> {hour}</span>
        <span>:{minute}:</span>
        <span>{second} </span>
      </chakra.div>

      <Button
        variant="link"
        fontWeight="bold"
        fontSize="4xl"
        colorScheme="white"
        onClick={() => {
          setOffset((o) => o + 1);
          trackEvent("clock", "offsetForward");
        }}
      >
        &gt;
      </Button>
    </HStack>
  );
};

export default memo(TimeDisplay);
