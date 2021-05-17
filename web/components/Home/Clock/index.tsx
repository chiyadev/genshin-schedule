import React, { memo } from "react";
import { FaClock } from "react-icons/fa";
import ServerText from "./ServerText";
import TimeDisplay from "./TimeDisplay";
import DateDisplay from "./DateDisplay";
import { HStack, Icon, VStack } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

const Clock = () => {
  return (
    <VStack spacing={1}>
      <HStack fontSize="lg" spacing={2} justify="center">
        <Icon as={FaClock} />
        <div>
          <FormattedMessage defaultMessage="Time in Teyvat" /> (<ServerText />)
        </div>
      </HStack>

      <TimeDisplay />
      <DateDisplay />
    </VStack>
  );
};

export default memo(Clock);
