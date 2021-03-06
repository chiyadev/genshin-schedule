import React, { Dispatch, memo } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { trackEvent } from "../../../../utils/umami";
import { Checkbox, HStack, Icon, Spacer } from "@chakra-ui/react";
import { ServerResetHour } from "../../../../utils/time";

const IntervalResetCheck = ({ value, setValue }: { value: boolean; setValue: Dispatch<boolean> }) => {
  return (
    <HStack spacing={2}>
      <Icon as={FaSyncAlt} />

      <HStack as="label" spacing={2} cursor="pointer" flex={1}>
        <div>Respawns on server reset ({ServerResetHour}AM)</div>
        <Spacer />

        <Checkbox
          size="sm"
          isChecked={value}
          onChange={({ currentTarget: { checked } }) => {
            setValue(checked);
            trackEvent("map", "taskToggleHide");
          }}
        />
      </HStack>
    </HStack>
  );
};

export default memo(IntervalResetCheck);
