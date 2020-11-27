import React, { memo, useState } from "react";
import { Button, chakra, Collapse, Icon, VStack } from "@chakra-ui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import TaskListCard from "../TaskListCard";
import { useDueTasks } from "../../utils/tasks";
import { useConfig } from "../../utils/configs";

const TaskListOverlay = () => {
  const tasks = useDueTasks();
  const [hover, setHover] = useState(false);
  const [expanded, setExpanded] = useConfig("mapTaskList");

  return (
    <VStack
      position="fixed"
      align="stretch"
      spacing={0}
      bottom={0}
      left={0}
      m={2}
      w="lg"
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
          onClick={() => setExpanded((v) => !v)}
        >
          <span>
            {expanded ? <span>Hide list</span> : <span>Show list</span>}
            <span> ({tasks.length})</span>
          </span>
        </Button>
      </div>

      {!!tasks.length && (
        <Collapse in={expanded} unmountOnExit>
          <chakra.div maxH="xs" overflowY="auto" borderRadius="md" mt={1}>
            <TaskListCard />
          </chakra.div>
        </Collapse>
      )}
    </VStack>
  );
};

export default memo(TaskListOverlay);
