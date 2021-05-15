import React, { memo } from "react";
import { FaSearch } from "react-icons/fa";
import { useConfig } from "../../utils/config";
import { chakra, Icon, Input, InputGroup, InputLeftElement, Link, useColorModeValue, VStack } from "@chakra-ui/react";
import { FormattedMessage, useIntl } from "react-intl";

const Search = () => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useConfig("customizeQuery");

  return (
    <VStack align="stretch" spacing={2}>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color="gray.500" fontSize="md" />
        </InputLeftElement>

        <Input
          value={value}
          onChange={({ currentTarget: { value } }) => setValue(value)}
          placeholder={formatMessage({ defaultMessage: "Search characters, weapons and artifacts..." })}
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
