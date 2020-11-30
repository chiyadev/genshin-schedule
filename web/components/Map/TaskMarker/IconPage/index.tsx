import React, { Dispatch, memo, SetStateAction, useEffect, useMemo, useRef } from "react";
import { Task, useConfig } from "../../../../utils/configs";
import { PopupPage } from "../index";
import { Icons, IconSearch, KnownResourceTimers } from "./search";
import Item from "./Item";
import { chakra, Icon, Input, InputGroup, InputLeftElement, SimpleGrid, VStack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const IconPage = ({
  setTask,
  setPage,
}: {
  setTask: Dispatch<SetStateAction<Task>>;
  setPage: Dispatch<SetStateAction<PopupPage>>;
}) => {
  const [search, setSearch] = useConfig("iconQuery");
  const [scroll, setScroll] = useConfig("iconListScroll");

  const results = useMemo(() => {
    const set = new Set(IconSearch.search(search));

    // preserve display order
    return Icons.filter((icon) => set.has(icon));
  }, [search]);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // restore scroll position on init
  useEffect(() => {
    listRef.current?.scrollTo({ top: scroll });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // save scroll position on scroll
  useEffect(() => {
    const handle = () => {
      listRef.current && setScroll(listRef.current.scrollTop);
    };

    const element = listRef.current;
    element?.addEventListener("scroll", handle);
    return () => element?.removeEventListener("scroll", handle);
  }, [setScroll]);

  useEffect(() => inputRef.current?.focus(), []);

  return (
    <VStack align="stretch" spacing={0}>
      <InputGroup size="sm" zIndex={1}>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color="gray.500" fontSize="md" />
        </InputLeftElement>

        <Input
          ref={inputRef}
          variant="flushed"
          fontSize="md"
          value={search}
          onChange={({ currentTarget: { value } }) => setSearch(value)}
          placeholder="Search icons"
        />
      </InputGroup>

      <chakra.div ref={listRef} h={40} overflowY="auto" my={-2}>
        <SimpleGrid columns={7} spacing={1} py={2}>
          {useMemo(
            () =>
              results.map((icon) => (
                <Item
                  key={icon}
                  name={icon}
                  onClick={() => {
                    const timer = KnownResourceTimers[icon];

                    setTask((task) => ({
                      ...task,
                      name: icon,
                      icon,
                      refreshTime: timer || task.refreshTime,
                    }));

                    setPage("info");
                  }}
                />
              )),
            [results, setPage, setTask]
          )}
        </SimpleGrid>
      </chakra.div>
    </VStack>
  );
};

export default memo(IconPage);
