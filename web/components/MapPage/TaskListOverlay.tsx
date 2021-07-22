import React, { memo, useCallback, useState } from "react";
import { chakra, Collapse, HStack, Icon, Link, VStack } from "@chakra-ui/react";
import TaskListCard from "../TaskListCard";
import { useDueTasks, useFilteredTasks } from "../../utils/tasks";
import { useConfig } from "../../utils/config";
import { useHotkeys } from "react-hotkeys-hook";
import { trackEvent } from "../../utils/umami";
import { FormattedMessage } from "react-intl";
import { ChevronDown, ChevronUp } from "react-feather";

const TaskListOverlay = () => {
  const [tasks] = useConfig("tasks");
  const dueTasks = useDueTasks(useFilteredTasks(tasks));
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
      transition=".2s"
      opacity={!expanded || hover ? 1 : 0.25}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div>
        <Link as="button" color="white" fontSize="sm" onClick={toggleExpand}>
          <HStack spacing={2}>
            <Icon as={expanded ? ChevronDown : ChevronUp} />
            <div>
              {expanded ? (
                <FormattedMessage defaultMessage="Hide list" />
              ) : (
                <FormattedMessage defaultMessage="Show list" />
              )}
              <span> ({dueTasks.length})</span>
            </div>
          </HStack>
        </Link>
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
