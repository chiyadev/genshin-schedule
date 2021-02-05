import React, { memo } from "react";
import { HStack, Icon, Switch } from "@chakra-ui/react";
import { FaListOl } from "react-icons/fa";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";

const TaskListCompactSwitch = () => {
  const [value, setValue] = useConfig("taskListCompact");

  return (
    <HStack spacing={4}>
      <HStack spacing={2}>
        <Icon as={FaListOl} />
        <div>Compact task list</div>
      </HStack>

      <Switch
        isChecked={value}
        onChange={({ currentTarget: { checked } }) => {
          setValue(checked);
          trackEvent("taskList", `compact${checked ? "Enable" : "Disable"}`);
        }}
      />
    </HStack>
  );
};

export default memo(TaskListCompactSwitch);
