import React, { memo } from "react";
import { useConfig } from "../../../utils/configs";
import { useServerDate } from "../../../utils/time";
import { clampResin, getResinRecharge } from "../../../db/resins";
import { trackEvent } from "../../../utils/umami";
import { Button, HStack } from "@chakra-ui/react";

const resinUsages = [20, 40, 60];

const Subtractor = ({ current }: { current: number }) => {
  const [, setResin] = useConfig("resin");
  const date = useServerDate(60000);

  return (
    <HStack spacing={2}>
      {resinUsages.map(
        (usage) =>
          current - usage > 0 && (
            <Button
              key={usage}
              variant="link"
              color="gray.500"
              size="sm"
              minW={0}
              onClick={() => {
                setResin((resin) => ({
                  value: clampResin(clampResin(resin.value + getResinRecharge(date.getTime() - resin.time)) - usage),
                  time: date.getTime(),
                }));

                trackEvent("resin", `subtract${usage}`);
              }}
            >
              -{usage}
            </Button>
          )
      )}
    </HStack>
  );
};

export default memo(Subtractor);
