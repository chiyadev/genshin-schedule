import React, { memo } from "react";
import { Tooltip } from "@chakra-ui/tooltip";
import { useConfig } from "../../../utils/config";
import { Button, Icon } from "@chakra-ui/react";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage } from "react-intl";
import { Eye, EyeOff } from "react-feather";

const ShowHiddenButton = () => {
  const [value, setValue] = useConfig("taskListShowHidden");

  return (
    <Tooltip
      label={
        value ? <FormattedMessage defaultMessage="Hide hidden" /> : <FormattedMessage defaultMessage="Show hidden" />
      }
      closeOnClick={false}
    >
      <Button
        as="button"
        variant="ghost"
        w={8}
        h={8}
        p={1}
        minW={0}
        opacity={value ? 1 : 0.5}
        onClick={() => {
          setValue((value) => !value);
          trackEvent("taskList", "taskShowHidden");
        }}
      >
        <Icon as={value ? Eye : EyeOff} />
      </Button>
    </Tooltip>
  );
};

export default memo(ShowHiddenButton);
