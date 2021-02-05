import React, { Dispatch, memo, SetStateAction, useState } from "react";
import { DefaultConfig, Task, useSync } from "../../../../utils/config";
import { PopupPage } from "../index";
import IntervalPicker from "./IntervalPicker";
import DueText from "./DueText";
import HideCheck from "./HideCheck";
import { chakra, HStack, Input, Textarea, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../../assets";
import IntervalResetCheck from "./IntervalResetCheck";
import { KnownResourceTimers } from "../IconPage/search";
import NotifyToggle from "./NotifyToggle";

const InfoPage = ({
  task,
  setTask,
  setPage,
  showDue,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  setPage: Dispatch<SetStateAction<PopupPage>>;
  showDue?: boolean;
}) => {
  const [nameFocus, setNameFocus] = useState(false);
  const { enabled: syncEnabled } = useSync();

  return (
    <VStack align="stretch" spacing={1}>
      <HStack spacing={2}>
        <chakra.img
          alt={task.icon}
          src={getAssetByName(task.icon)}
          w={8}
          h={8}
          cursor="pointer"
          objectFit="contain"
          onClick={() => setPage("icon")}
        />

        <Input
          value={task.name}
          onChange={({ currentTarget: { value } }) => {
            setTask((task) => ({ ...task, name: value }));
          }}
          flex={1}
          fontSize="lg"
          fontWeight="bold"
          borderWidth={nameFocus ? undefined : 0}
          p={1}
          h={8}
          placeholder={task.icon}
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
      </HStack>

      <Textarea
        variant="unstyled"
        value={task.description || ""}
        onChange={({ currentTarget: { value } }) => {
          setTask((task) => ({ ...task, description: value }));
        }}
        color="gray.500"
        resize="none"
        h={12}
        p={0}
        borderRadius={0}
        placeholder="Task description"
      />

      <VStack align="stretch" spacing={1}>
        {task.refreshTime === "reset" ? (
          <IntervalResetCheck
            value
            setValue={() => {
              setTask((task) => {
                const timer = KnownResourceTimers[task.icon];

                return {
                  ...task,
                  refreshTime: typeof timer === "number" ? timer : DefaultConfig.mapCreateTask.refreshTime,
                };
              });
            }}
          />
        ) : (
          <IntervalPicker
            value={task.refreshTime}
            setValue={(value) => {
              setTask((task) => ({ ...task, refreshTime: value }));
            }}
          />
        )}

        {showDue && (
          <>
            <HideCheck
              value={!task.visible}
              setValue={(v) => {
                setTask((task) => ({ ...task, visible: !v }));
              }}
            />

            {syncEnabled && (
              <NotifyToggle
                task={task}
                value={task.notify || false}
                setValue={(value) => {
                  setTask((task) => ({ ...task, notify: value }));
                }}
              />
            )}

            <DueText task={task} />
          </>
        )}
      </VStack>
    </VStack>
  );
};

export default memo(InfoPage);
