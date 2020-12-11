import React, { memo } from "react";
import { FaClock } from "react-icons/fa";
import ServerText from "./ServerText";
import TimeDisplay from "./TimeDisplay";
import DateDisplay from "./DateDisplay";
import OffsetAlert from "./OffsetAlert";
import { chakra, DarkMode, HStack, Icon } from "@chakra-ui/react";

const Clock = () => {
  return (
    <DarkMode>
      <chakra.div textAlign="center" color="white">
        <HStack fontSize="lg" spacing={2} justify="center">
          <Icon as={FaClock} />
          <div>
            Time in Teyvat (<ServerText />)
          </div>
        </HStack>

        <TimeDisplay />
        <DateDisplay />
        <OffsetAlert />
      </chakra.div>
    </DarkMode>
  );
};

export default memo(Clock);
