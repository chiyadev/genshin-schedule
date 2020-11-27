import React, { Dispatch, memo, SetStateAction, useEffect, useRef, useState } from "react";
import { Task } from "../../../../utils/configs";
import { PopupPage } from "../index";
import IntervalPicker from "./IntervalPicker";
import DueText from "./DueText";
import HideCheck from "./HideCheck";
import { chakra, HStack, Input, Textarea, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../../assets";

const InfoPage = ({
  task,
  setTask,
  setPage,
  autoFocus,
  showDue,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  setPage: Dispatch<SetStateAction<PopupPage>>;
  autoFocus?: boolean;
  showDue?: boolean;
}) => {
  const [nameFocus, setNameFocus] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus) {
      descriptionRef.current?.focus();
    }
  }, [autoFocus]);

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
          onInput={({ currentTarget: { value } }) => {
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
        ref={descriptionRef}
        variant="unstyled"
        value={task.description || ""}
        onInput={({ currentTarget: { value } }) => {
          setTask((task) => ({ ...task, description: value }));
        }}
        color="gray.500"
        resize="none"
        h={12}
        p={0}
        placeholder="Task description"
      />

      <VStack align="stretch" spacing={1}>
        <IntervalPicker
          value={task.refreshTime}
          setValue={(value) => {
            setTask((task) => ({ ...task, refreshTime: value }));
          }}
        />

        {showDue && (
          <>
            <HideCheck task={task} setTask={setTask} />
            <DueText task={task} />
          </>
        )}
      </VStack>
    </VStack>
  );
};

export default memo(InfoPage);
