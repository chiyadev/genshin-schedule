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
          placeholder={formatMessage({ id: "dbSearch" })}
        />
      </InputGroup>

      <chakra.div fontSize="sm" color="gray.500">
        <div>
          <FormattedMessage id="dbSelect" />
        </div>
        <div>
          <FormattedMessage
            id="dbMissing"
            values={{
              link: (
                <Link
                  href="https://github.com/chiyadev/genshin-schedule/issues"
                  color={useColorModeValue("blue.500", "blue.300")}
                  isExternal
                >
                  <FormattedMessage id="dbMissingLink" />
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
