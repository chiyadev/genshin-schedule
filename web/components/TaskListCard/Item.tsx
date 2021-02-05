import { chakra, HStack, Link, Spacer, useColorModeValue, useToken, VStack } from "@chakra-ui/react";
import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../utils/config";
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
  const setFocused = useTaskFocusSetter();
  const [highlightColor] = useToken("colors", [useColorModeValue("yellow.100", "yellow.900")]);

  return (
    <HStack spacing={0} my={-1}>
      <HStack spacing={2} bg={task.highlight ? highlightColor : undefined} borderRadius="sm">
        <chakra.img
          alt={task.icon}
          src={getAssetByName(task.icon)}
          w={10}
          h={10}
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

        <VStack align="start" spacing={0} flex={1}>
          <div>
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
          </div>

          {task.description && (
            <chakra.div fontSize="sm" color="gray.500" wordBreak="break-word">
              {task.description}
            </chakra.div>
          )}
        </VStack>
      </HStack>

      <Spacer minW={2} />

      <chakra.div flexShrink={0}>
        <DoneButton task={task} setTask={setTask} />
      </chakra.div>
    </HStack>
  );
};

export default memo(Item);
