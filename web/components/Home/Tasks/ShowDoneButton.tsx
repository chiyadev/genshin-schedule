import React, { memo } from "react";
import { Tooltip } from "@chakra-ui/tooltip";
import { useConfig } from "../../../utils/config";
import { Button, Icon } from "@chakra-ui/react";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage } from "react-intl";
import { CheckCircle, XCircle } from "react-feather";

const ShowDoneButton = () => {
  const [value, setValue] = useConfig("taskListShowDone");

  return (
    <Tooltip
      label={value ? <FormattedMessage defaultMessage="Hide done" /> : <FormattedMessage defaultMessage="Show done" />}
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
          trackEvent("taskList", "taskShowDone");
        }}
      >
        <Icon as={value ? CheckCircle : XCircle} />
      </Button>
    </Tooltip>
  );
};

export default memo(ShowDoneButton);
