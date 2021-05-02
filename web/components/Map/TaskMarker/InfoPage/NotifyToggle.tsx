import React, { Dispatch, memo, useMemo } from "react";
import { Checkbox, HStack, Icon, Spacer } from "@chakra-ui/react";
import { FaBell, FaBellSlash } from "react-icons/fa";
import { trackEvent } from "../../../../utils/umami";
import { Task, useApiNotification } from "../../../../utils/config";
import { useServerTime } from "../../../../utils/time";
import { getAssetByName } from "../../../../assets";
import { useColorHex } from "../../../../utils/theme";
import { FormattedMessage, useIntl } from "react-intl";

export const NotifyToggle = ({
  task,
  value,
  setValue,
}: {
  task: Task;
  value: boolean;
  setValue: Dispatch<boolean>;
}) => {
  const { formatMessage } = useIntl();
  const time = useServerTime(60000);
  const color = useColorHex("orange.300");

  useApiNotification(
    useMemo(
      () => ({
        key: `task_${task.id}`,
        time: task.dueTime,
        icon: getAssetByName(task.icon) || "",
        title: formatMessage({ id: "taskRespawned" }, { name: task.name }),
        description: task.description || "",
        url: "/map",
        color,
      }),
      [task.id, task.dueTime, task.icon, task.name, task.description, color]
    ),
    value && time.valueOf() < task.dueTime
  );

  return (
    <HStack spacing={2}>
      <Icon as={value ? FaBell : FaBellSlash} />

      <HStack as="label" spacing={2} cursor="pointer" flex={1}>
        <div>
          <FormattedMessage id="taskNotify" />
        </div>
        <Spacer />

        <Checkbox
          size="sm"
          isChecked={value}
          onChange={({ currentTarget: { checked } }) => {
            setValue(checked);
            trackEvent("map", "taskToggleNotify");
          }}
        />
      </HStack>
    </HStack>
  );
};

export default memo(NotifyToggle);
