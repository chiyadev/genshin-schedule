import React, { memo, useRef, useState } from "react";
import { useConfig } from "../../utils/config";
import { chakra, Icon, Input, InputGroup, InputLeftElement, Link, useColorModeValue, VStack } from "@chakra-ui/react";
import { FormattedMessage, useIntl } from "react-intl";
import { useHotkeys } from "react-hotkeys-hook";
import { Search as SearchIcon } from "react-feather";

const Search = () => {
  const { formatMessage } = useIntl();
  const [query, setQuery] = useConfig("customizeQuery");
  const [value, setValue] = useState(query);
  const ref = useRef<HTMLInputElement>(null);
  const debounce = useRef<number>();

  useHotkeys("f", (e) => {
    ref.current?.select();
    e.preventDefault();
  });

  return (
    <VStack align="stretch" spacing={2}>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} color="gray.500" />
        </InputLeftElement>

        <Input
          ref={ref}
          variant="filled"
          value={value}
          onChange={({ currentTarget: { value } }) => {
            setValue(value);

            clearTimeout(debounce.current);
            debounce.current = window.setTimeout(() => setQuery(value), 100);
          }}
          placeholder={formatMessage({ defaultMessage: "Search characters, weapons and artifacts…" })}
        />
      </InputGroup>

      <chakra.div fontSize="sm" color="gray.500">
        <div>
          <FormattedMessage defaultMessage="Select items to be added to your farming schedule." />
        </div>
        <div>
          <FormattedMessage
            defaultMessage="If there are any missing items, please {link} on GitHub."
            values={{
              link: (
                <Link
                  href="https://github.com/chiyadev/genshin-schedule/issues"
                  color={useColorModeValue("blue.500", "blue.300")}
                  isExternal
                >
                  <FormattedMessage defaultMessage="create an issue" />
                </Link>
              ),
            }}
          />
        </div>
      </chakra.div>
    </VStack>
  );
};

export default memo(Search);
