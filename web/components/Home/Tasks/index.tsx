import React, { memo, useCallback, useRef } from "react";
import WidgetWrapper from "../WidgetWrapper";
import { useDueTasks, useFilteredTasks } from "../../../utils/tasks";
import TaskListCard from "../../TaskListCard";
import MarkAllDone from "./MarkAllDone";
import { FaAngleRight, FaTimes } from "react-icons/fa";
import NextLink from "next/link";
import { chakra, HStack, Icon, Link, useColorModeValue, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import SearchButton from "./SearchButton";
import { useHotkeys } from "react-hotkeys-hook";
import { useConfig } from "../../../utils/config";

const MapCore = dynamic(() => import("../../Map"), { ssr: false });

const TaskList = () => {
  const [tasks] = useConfig("tasks");
  const dueTasks = useDueTasks(useFilteredTasks(tasks));
  const mapRef = useRef<HTMLDivElement>(null);

  const scrollToMap = useCallback(() => {
    mapRef.current?.scrollIntoView({
      block: "center",
    });
  }, []);

  useHotkeys(
    "n",
    (e) => {
      scrollToMap();
      e.preventDefault();
    },
    [scrollToMap]
  );

  return (
    <WidgetWrapper
      type="tasks"
      heading={<span>Today&apos;s Tasks{!!dueTasks.length && <span> ({dueTasks.length})</span>}</span>}
      menu={<SearchButton />}
    >
      <VStack align="stretch" spacing={4}>
        {dueTasks.length ? (
          <VStack align="stretch" spacing={2}>
            <TaskListCard onItemClick={scrollToMap} />

            <chakra.div textAlign="right">
              <MarkAllDone />
            </chakra.div>
          </VStack>
        ) : (
          <HStack spacing={2}>
            <Icon as={FaTimes} />
            <div>No tasks for now. Create one by clicking on the map.</div>
          </HStack>
        )}

        <VStack align="stretch" spacing={2}>
          <chakra.div
            ref={mapRef}
            h="md"
            bg={useColorModeValue("white", "gray.900")}
            overflow="hidden"
            borderRadius="md"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            borderWidth={1}
          >
            <MapCore
              minimal
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </chakra.div>

          <chakra.div textAlign="right" fontSize="sm">
            <NextLink href="/home/map" passHref>
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
