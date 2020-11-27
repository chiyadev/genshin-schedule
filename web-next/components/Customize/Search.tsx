import React, { memo } from "react";
import { FaSearch } from "react-icons/fa";
import { useConfig } from "../../utils/configs";
import { chakra, Icon, Input, InputGroup, InputLeftElement, Link, VStack } from "@chakra-ui/react";

const Search = () => {
  const [value, setValue] = useConfig("customizeQuery");

  return (
    <VStack align="stretch" spacing={2}>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color="gray.500" fontSize="md" />
        </InputLeftElement>

        <Input
          autoFocus
          bg="white"
          value={value}
          onInput={({ currentTarget: { value } }) => setValue(value)}
          placeholder="Search characters, weapons and artifacts."
        />
      </InputGroup>

      <chakra.div fontSize="sm" color="gray.500">
        <div>Select items to be added to your farming schedule.</div>
        <div>
          <span>If there are any missing items, please </span>
          <Link
            href={`https://github.com/chiyadev/genshin-schedule/issues/new?title=${encodeURIComponent(
              "bug: Missing item in database {insert item name}"
            )}`}
            fontWeight="bold"
            isExternal
          >
            create an issue
          </Link>
          <span> on GitHub.</span>
        </div>
      </chakra.div>
    </VStack>
  );
};

export default memo(Search);
