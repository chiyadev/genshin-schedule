import React, { memo, useCallback, useState } from "react";
import { Button, chakra, Collapse, Icon, VStack } from "@chakra-ui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import TaskListCard from "../TaskListCard";
import { useDueTasks } from "../../utils/tasks";
import { useConfig } from "../../utils/configs";
import { useHotkeys } from "react-hotkeys-hook";
import { trackEvent } from "../../utils/umami";

const TaskListOverlay = () => {
  const [tasks] = useConfig("tasks");
  const dueTasks = useDueTasks(tasks);
  const [hover, setHover] = useState(false);
  const [expanded, setExpanded] = useConfig("mapTaskList");

  const toggleExpand = useCallback(() => {
    setExpanded((v) => !v);
    trackEvent("map", "listToggle");
  }, []);

  useHotkeys(
    "l",
    (e) => {
      toggleExpand();
      e.preventDefault();
    },
    [toggleExpand]
  );

  return (
    <VStack
      position="fixed"
      align="stretch"
      spacing={0}
      bottom={0}
      left={0}
      right={0}
      m={2}
      maxW="lg"
      zIndex={10}
      transition=".2s all"
      color="white"
      opacity={!expanded || hover ? 1 : 0.25}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div>
        <Button
          variant="link"
          size="sm"
          colorScheme="white"
          fontWeight="normal"
          leftIcon={<Icon as={expanded ? FaChevronDown : FaChevronUp} />}
          onClick={toggleExpand}
        >
          <span>
            {expanded ? <span>Hide list</span> : <span>Show list</span>}
            <span> ({dueTasks.length})</span>
          </span>
        </Button>
      </div>

      {!!dueTasks.length && (
        <Collapse in={expanded}>
          <chakra.div maxH="xs" overflowY="auto" borderRadius="md" mt={1}>
            <TaskListCard />
          </chakra.div>
        </Collapse>
      )}
    </VStack>
  );
};

export default memo(TaskListOverlay);
