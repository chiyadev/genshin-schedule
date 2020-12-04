import React, { memo, useCallback } from "react";
import { useServerDate } from "../../../utils/time";
import { useConfig } from "../../../utils/configs";
import { trackEvent } from "../../../utils/umami";
import { Button, chakra, HStack } from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";

const TimeDisplay = () => {
  const date = useServerDate();
  const [, setOffset] = useConfig("offsetDays");

  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  const backward = useCallback(() => {
    setOffset((o) => o - 1);
    trackEvent("clock", "offsetBackward");
  }, [setOffset]);

  const forward = useCallback(() => {
    setOffset((o) => o + 1);
    trackEvent("clock", "offsetForward");
  }, [setOffset]);

  useHotkeys("esc", () => setOffset(0), [setOffset]);
  useHotkeys("left", backward, [backward]);
  useHotkeys("right", forward, [forward]);

  return (
    <HStack justify="center">
      <Button variant="link" fontWeight="bold" fontSize="4xl" colorScheme="white" onClick={backward}>
        &lt;
      </Button>

      <chakra.div fontWeight="bold" fontSize="4xl">
        <span> {hour}</span>
        <span>:{minute}:</span>
        <span>{second} </span>
      </chakra.div>

      <Button variant="link" fontWeight="bold" fontSize="4xl" colorScheme="white" onClick={forward}>
        &gt;
      </Button>
    </HStack>
  );
};

export default memo(TimeDisplay);
