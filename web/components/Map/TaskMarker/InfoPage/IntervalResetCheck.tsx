import React, { Dispatch, memo } from "react";
import { trackEvent } from "../../../../utils/umami";
import { Checkbox, HStack, Icon, Spacer } from "@chakra-ui/react";
import { ServerResetHour, useFormatUnit } from "../../../../utils/time";
import { FormattedMessage, useIntl } from "react-intl";
import { Repeat } from "react-feather";
import { TaskRefreshTime } from "../../../../utils/config";

const IntervalResetCheck = ({ value, setValue }: { value: TaskRefreshTime; setValue: Dispatch<boolean> }) => {
  const { formatMessage } = useIntl();

  let description;
  switch (value) {
    case "reset": {
      description = (
        <div>
          <FormattedMessage defaultMessage="Respawns on server reset" /> (
          <FormattedMessage defaultMessage="{time}AM" values={{ time: ServerResetHour }} />)
        </div>
      );
      break;
    }

    default: {
      description = (
        <div>
          <FormattedMessage defaultMessage="Respawn on every" />
          {" " + useFormatUnit(`day.${value}`) + " "}(
          {formatMessage({ defaultMessage: "{time}AM" }, { time: ServerResetHour })})
        </div>
      );
      break;
    }
  }

  return (
    <HStack spacing={2}>
      <Icon as={Repeat} />

      <HStack as="label" spacing={2} cursor="pointer" flex={1}>
        {description}
        <Spacer />

        <Checkbox
          size="sm"
          isChecked
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
