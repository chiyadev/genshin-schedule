import React, { Dispatch, memo, SetStateAction, useEffect, useMemo, useRef } from "react";
import { Task, useConfig } from "../../../../utils/config";
import { PopupPage } from "../index";
import { IconCategories, IconSearch, KnownResourceTimers } from "../../../../db/icons";
import Item from "./Item";
import { chakra, Icon, Input, InputGroup, InputLeftElement, SimpleGrid, VStack } from "@chakra-ui/react";
import { FormattedMessage as FormattedMessageId, useIntl } from "react-intl";
import { Search } from "react-feather";

const IconPage = ({
  setTask,
  setPage,
}: {
  setTask: Dispatch<SetStateAction<Task>>;
  setPage: Dispatch<SetStateAction<PopupPage>>;
}) => {
  const { formatMessage: formatMessageId } = useIntl();
  const [search, setSearch] = useConfig("iconQuery");
  const [scroll, setScroll] = useConfig("iconListScroll");

  const results = useMemo(() => {
    const set = new Set(IconSearch.search(search));
    const obj: Record<string, string[]> = {};

    for (const category of Object.keys(IconCategories)) {
      const icons = IconCategories[category].filter((icon) => set.has(icon));

      if (icons.length) {
        obj[category] = icons;
      }
    }

    return obj;
  }, [search]);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // restore scroll position on init
  useEffect(() => {
    listRef.current?.scrollTo({ top: scroll });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // save scroll position on scroll
  useEffect(() => {
    const element = listRef.current;

    if (!element) {
      return;
    }

    let timeout = 0;

    const handle = () => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => setScroll(element.scrollTop), 500);
    };

    element.addEventListener("scroll", handle);
    return () => element.removeEventListener("scroll", handle);
  }, [setScroll]);

  useEffect(() => inputRef.current?.focus(), []);

  return (
    <VStack align="stretch" spacing={0}>
      <InputGroup size="sm" zIndex={1}>
        <InputLeftElement pointerEvents="none">
          <Icon as={Search} color="gray.500" fontSize="md" />
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

      <VStack ref={listRef} align="stretch" spacing={4} h={40} overflowY="auto" my={-2} py={2}>
        {useMemo(
          () =>
            Object.keys(results).map((category) => (
              <VStack key={category} align="stretch" spacing={1}>
                <chakra.span fontWeight="semibold" fontSize="sm">
                  <FormattedMessageId id={category} />
                </chakra.span>

                <SimpleGrid columns={7} spacing={1}>
                  {results[category].map((icon) => (
                    <Item
                      key={icon}
                      name={icon}
                      onClick={() => {
                        const timer = KnownResourceTimers[icon];

                        setTask((task) => ({
                          ...task,
                          name: formatMessageId({ id: icon }),
                          icon,
                          description: "",
                          refreshTime: timer || task.refreshTime,
                        }));

                        setPage("info");
                      }}
                    />
                  ))}
                </SimpleGrid>
              </VStack>
            )),
          [results, setPage, setTask]
        )}
      </VStack>
    </VStack>
  );
};

export default memo(IconPage);
