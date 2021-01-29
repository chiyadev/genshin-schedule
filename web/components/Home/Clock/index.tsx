import React, { memo } from "react";
import { FaClock } from "react-icons/fa";
import ServerText from "./ServerText";
import TimeDisplay from "./TimeDisplay";
import DateDisplay from "./DateDisplay";
import OffsetAlert from "./OffsetAlert";
import { HStack, Icon, VStack } from "@chakra-ui/react";

const Clock = () => {
  return (
    <VStack spacing={1}>
      <HStack fontSize="lg" spacing={2} justify="center">
        <Icon as={FaClock} />
        <div>
          Time in Teyvat (<ServerText />)
        </div>
      </HStack>

      <TimeDisplay />

      <VStack spacing={0}>
        <DateDisplay />
        <OffsetAlert />
      </VStack>
    </VStack>
  );
};

export default memo(Clock);
