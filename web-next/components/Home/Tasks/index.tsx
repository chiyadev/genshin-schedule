import React, { memo } from "react";
import WidgetWrapper from "../WidgetWrapper";
import { useDueTasks } from "../../../utils/tasks";
import TaskListCard from "../../TaskListCard";
import MarkAllDone from "./MarkAllDone";
import { FaAngleRight, FaTimes } from "react-icons/fa";
import NextLink from "next/link";
import { chakra, Icon, Link, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const MapCore = dynamic(() => import("../../Map"), { ssr: false });

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
            <TaskListCard />

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
          <chakra.div h="md" boxShadow="lg" bg="gray.800" borderRadius="md">
            <MapCore
              minimal
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </chakra.div>

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
