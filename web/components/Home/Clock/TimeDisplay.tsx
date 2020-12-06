import React, { memo, useCallback } from "react";
import { useServerDate } from "../../../utils/time";
import { useConfig } from "../../../utils/configs";
import { trackEvent } from "../../../utils/umami";
import { Button, chakra, HStack } from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";

const TimeDisplay = () => {
  const date = useServerDate();
  const [offset, setOffset] = useConfig("offsetDays");

  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  const backward = useCallback(() => {
    setOffset((o) => Math.max(-7, o - 1));
    trackEvent("clock", "offsetBackward");
  }, [setOffset]);

  const forward = useCallback(() => {
    setOffset((o) => Math.min(7, o + 1));
    trackEvent("clock", "offsetForward");
  }, [setOffset]);

  const reset = useCallback(() => {
    setOffset(0);
    trackEvent("clock", "offsetReset");
  }, [setOffset]);

  useHotkeys("left", backward, [backward]);
  useHotkeys("right", forward, [forward]);
  useHotkeys("esc", reset, [reset]);

  return (
    <HStack justify="center">
      <Button
        variant="link"
        fontWeight="bold"
        fontSize="4xl"
        colorScheme="white"
        onClick={backward}
        disabled={offset <= -7}
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
        onClick={forward}
        disabled={offset >= 7}
      >
        &gt;
      </Button>
    </HStack>
  );
};

export default memo(TimeDisplay);
