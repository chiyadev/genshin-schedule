import { chakra, HStack, Link, Spacer, useColorModeValue, useToken, VStack } from "@chakra-ui/react";
import React, { Dispatch, memo, SetStateAction } from "react";
import { Task, useConfig } from "../../utils/config";
import { trackEvent } from "../../utils/umami";
import DoneButton from "./DoneButton";
import { getAssetByName } from "../../assets";
import { useTaskFocusSetter } from "../../utils/tasks";

const Item = ({
  task,
  setTask,
  onTaskClick,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  onTaskClick?: (task: Task) => void;
}) => {
  const [compact] = useConfig("taskListCompact");
  const [highlightColor] = useToken("colors", [useColorModeValue("yellow.100", "yellow.900")]);

  const setFocused = useTaskFocusSetter();

  const nameNode = (
    <Link
      as="button"
      fontSize="lg"
      fontWeight="bold"
      onClick={() => {
        setFocused(task);
        onTaskClick?.(task);

        trackEvent("taskList", "taskFocus");
      }}
    >
      {task.name}
    </Link>
  );

  return (
    <HStack spacing={0} my={compact ? -2 : -1}>
      <HStack spacing={2} bg={task.highlight ? highlightColor : undefined} borderRadius="sm">
        <chakra.img
          alt={task.icon}
          src={getAssetByName(task.icon)}
          w={compact ? 6 : 10}
          h={compact ? 6 : 10}
          objectFit="contain"
          flexShrink={0}
          cursor="pointer"
          onClick={() => {
            setTask((task) => ({
              ...task,
              highlight: !task.highlight,
            }));
          }}
        />

        {compact ? (
          <div>
            {nameNode}
            {task.description && (
              <chakra.span color="gray.500" wordBreak="break-word">
                <span> &mdash; </span>
                {task.description}
              </chakra.span>
            )}
          </div>
        ) : (
          <VStack align="start" spacing={0}>
            {nameNode}
            {task.description && (
              <chakra.span fontSize="sm" color="gray.500" wordBreak="break-word">
                {task.description}
              </chakra.span>
            )}
          </VStack>
        )}
      </HStack>

      <Spacer minW={2} />

      <chakra.div flexShrink={0}>
        <DoneButton task={task} setTask={setTask} />
      </chakra.div>
    </HStack>
  );
};

export default memo(Item);
