import React, { memo } from "react";
import WidgetWrapper from "../WidgetWrapper";
import { useDueTasks } from "../../../utils/tasks";
//import TaskListCard from "../../../taskList";
import MarkAllDone from "./MarkAllDone";
import { FaAngleRight, FaTimes } from "react-icons/fa";
//import MapCore from "../../../map";
import NextLink from "next/link";
import { chakra, Icon, Link, VStack } from "@chakra-ui/react";

const TaskList = () => {
  const tasks = useDueTasks();

  return (
    <WidgetWrapper
      type="tasks"
      heading={<span>Today&apos;s Tasks{!!tasks.length && <span> ({tasks.length})</span>}</span>}
    >
      <VStack align="stretch" spacing={4} color="white">
        {tasks.length ? (
          <VStack align="stretch" spacing={1}>
            {/*<TaskListCard />*/}

            <chakra.div textAlign="right">
              <MarkAllDone />
            </chakra.div>
          </VStack>
        ) : (
          <chakra.div>
            <Icon as={FaTimes} /> No tasks for now. Create one by clicking on the map.
          </chakra.div>
        )}

        <VStack align="stretch" spacing={1}>
          {/*<MapCore
              minimal
              className={cx(
                "w-full rounded shadow-lg",
                css`
                  height: 26rem;
                  background: rgba(0, 0, 0, 0.1) !important;
                `
              )}
            />*/}

          <chakra.div textAlign="right" fontSize="sm">
            <NextLink href="/map" passHref>
              <Link>
                Open map <Icon as={FaAngleRight} />
              </Link>
            </NextLink>
          </chakra.div>
        </VStack>
      </VStack>
    </WidgetWrapper>
  );
};

export default memo(TaskList);
