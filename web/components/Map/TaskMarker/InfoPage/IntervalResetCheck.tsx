import React, { Dispatch, memo } from "react";
import { trackEvent } from "../../../../utils/umami";
import { Checkbox, HStack, Icon, Spacer } from "@chakra-ui/react";
import { ServerResetHour } from "../../../../utils/time";
import { FormattedMessage } from "react-intl";
import { Repeat } from "react-feather";

const IntervalResetCheck = ({ value, setValue }: { value: boolean; setValue: Dispatch<boolean> }) => {
  return (
    <HStack spacing={2}>
      <Icon as={Repeat} />

      <HStack as="label" spacing={2} cursor="pointer" flex={1}>
        <div>
          <FormattedMessage defaultMessage="Respawns on server reset" /> (
          <FormattedMessage defaultMessage="{time}AM" values={{ time: ServerResetHour }} />)
        </div>
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
