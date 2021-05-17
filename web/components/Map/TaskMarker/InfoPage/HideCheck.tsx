import React, { Dispatch, memo } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { trackEvent } from "../../../../utils/umami";
import { Checkbox, HStack, Icon, Spacer } from "@chakra-ui/react";
import { useTaskFocusSetter } from "../../../../utils/tasks";
import { FormattedMessage } from "react-intl";

const HideCheck = ({ value, setValue }: { value: boolean; setValue: Dispatch<boolean> }) => {
  const setFocused = useTaskFocusSetter();

  return (
    <HStack spacing={2}>
      <Icon as={value ? FaEyeSlash : FaEye} />

      <HStack as="label" spacing={2} cursor="pointer" flex={1}>
        <div>
          <FormattedMessage defaultMessage="Hide temporarily" />
        </div>
        <Spacer />

        <Checkbox
          size="sm"
          isChecked={value}
          onChange={({ currentTarget: { checked } }) => {
            setValue(checked);

            checked && setFocused();
            trackEvent("map", "taskToggleHide");
          }}
        />
      </HStack>
    </HStack>
  );
};

export default memo(HideCheck);
