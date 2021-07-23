import React, { memo } from "react";
import { HStack, Icon, Stat, StatLabel, StatNumber, Switch } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage } from "react-intl";
import { List } from "react-feather";

const TaskListCompactSwitch = () => {
  const [value, setValue] = useConfig("taskListCompact");

  return (
    <Stat>
      <StatLabel>
        <HStack spacing={2}>
          <Icon as={List} />
          <div>
            <FormattedMessage defaultMessage="Compact task list" />
          </div>
        </HStack>
      </StatLabel>

      <StatNumber>
        <Switch
          isChecked={value}
          onChange={({ currentTarget: { checked } }) => {
            setValue(checked);
            trackEvent("taskList", `compact${checked ? "Enable" : "Disable"}`);
          }}
        />
      </StatNumber>
    </Stat>
  );
};

export default memo(TaskListCompactSwitch);
