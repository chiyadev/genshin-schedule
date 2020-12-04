import React, { memo } from "react";
import { useConfig } from "../../../utils/configs";
import { useServerDate } from "../../../utils/time";
import { clampResin, getResinRecharge } from "../../../db/resins";
import { trackEvent } from "../../../utils/umami";
import { Button, HStack } from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";

const resinUsages = [20, 40, 60];

const Subtractor = ({ current }: { current: number }) => {
  const [, setResin] = useConfig("resin");
  const date = useServerDate(60000);

  return (
    <HStack spacing={2}>
      {resinUsages.map(
        (value) =>
          current - value > 0 && (
            <SubtractButton
              key={value}
              value={value}
              onClick={() => {
                setResin((resin) => ({
                  value: clampResin(clampResin(resin.value + getResinRecharge(date.getTime() - resin.time)) - value),
                  time: date.getTime(),
                }));

                trackEvent("resin", `subtract${value}`);
              }}
            />
          )
      )}
    </HStack>
  );
};

const SubtractButton = ({ value, onClick }: { value: number; onClick: () => void }) => {
  useHotkeys(value.toString().slice(0, 1), onClick, [onClick]);

  return (
    <Button variant="link" color="gray.500" size="sm" minW={0} onClick={onClick}>
      -{value}
    </Button>
  );
};

export default memo(Subtractor);
