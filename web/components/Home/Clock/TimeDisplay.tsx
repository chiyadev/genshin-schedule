import React, { memo, useCallback } from "react";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { Button, Heading, HStack, Tooltip } from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";
import { useServerTime } from "../../../utils/time";

const TimeDisplay = () => {
  const time = useServerTime();
  const [offset, setOffset] = useConfig("offsetDays");

  const hour = time.hour.toString().padStart(2, "0");
  const minute = time.minute.toString().padStart(2, "0");
  const second = time.second.toString().padStart(2, "0");

  const backward = useCallback(() => {
    setOffset((o) => Math.max(-6, o - 1));
    trackEvent("clock", "offsetBackward");
  }, [setOffset]);

  const forward = useCallback(() => {
    setOffset((o) => Math.min(6, o + 1));
    trackEvent("clock", "offsetForward");
  }, [setOffset]);

  const reset = useCallback(() => {
    setOffset(0);
    trackEvent("clock", "offsetReset");
  }, [setOffset]);

  useHotkeys(
    "left",
    (e) => {
      backward();
      e.preventDefault();
    },
    [backward]
  );

  useHotkeys(
    "right",
    (e) => {
      forward();
      e.preventDefault();
    },
    [forward]
  );

  useHotkeys(
    "esc",
    (e) => {
      reset();
      e.preventDefault();
    },
    [reset]
  );

  return (
    <HStack spacing={2} fontFamily="Genshin">
      <Tooltip label="Previous day" closeOnClick={false}>
        <Button variant="ghost" fontSize="4xl" w={12} h={12} p={0} onClick={backward} disabled={offset <= -6}>
          &lt;
        </Button>
      </Tooltip>

      <Heading size="xl">
        {hour}:{minute}:{second}
      </Heading>

      <Tooltip label="Next day" closeOnClick={false}>
        <Button variant="ghost" fontSize="4xl" w={12} h={12} p={0} onClick={forward} disabled={offset >= 6}>
          &gt;
        </Button>
      </Tooltip>
    </HStack>
  );
};

export default memo(TimeDisplay);
