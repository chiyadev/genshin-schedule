import React, { memo } from "react";
import ServerText from "./ServerText";
import TimeDisplay from "./TimeDisplay";
import DateDisplay from "./DateDisplay";
import { HStack, Icon, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { Clock as ClockIcon } from "react-feather";

const Clock = () => {
  return (
    <Stat textAlign="center">
      <StatLabel>
        <HStack fontSize="md" spacing={2} justify="center">
          <Icon as={ClockIcon} />
          <div>
            <FormattedMessage defaultMessage="Time in Teyvat" /> (<ServerText />)
          </div>
        </HStack>
      </StatLabel>

      <StatNumber my={1}>
        <TimeDisplay />
      </StatNumber>

      <StatHelpText>
        <DateDisplay />
      </StatHelpText>
    </Stat>
  );
};

export default memo(Clock);
