import React, { memo } from "react";
import { FaClock } from "react-icons/fa";
import ServerText from "./ServerText";
import TimeDisplay from "./TimeDisplay";
import DateDisplay from "./DateDisplay";
import OffsetAlert from "./OffsetAlert";
import { chakra, DarkMode, Icon } from "@chakra-ui/react";

const Clock = () => {
  return (
    <DarkMode>
      <chakra.div textAlign="center" color="white">
        <chakra.div fontSize="lg">
          <Icon as={FaClock} /> Time in Teyvat (<ServerText />)
        </chakra.div>

        <TimeDisplay />
        <DateDisplay />
        <OffsetAlert />
      </chakra.div>
    </DarkMode>
  );
};

export default memo(Clock);
