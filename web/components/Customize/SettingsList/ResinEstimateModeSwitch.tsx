import React, { memo } from "react";
import { chakra, HStack, Icon, Select } from "@chakra-ui/react";
import { FaCalculator } from "react-icons/fa";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";

const ResinEstimateModeSwitch = () => {
  const [value, setValue] = useConfig("resinEstimateMode");

  return (
    <HStack w="full" spacing={4}>
      <HStack spacing={2}>
        <Icon as={FaCalculator} />
        <div>Resin estimation mode</div>
      </HStack>

      <chakra.div w="full" maxW="xs">
        <Select
          value={value}
          onChange={({ currentTarget: { value } }) => {
            setValue(value as any);
            trackEvent("resinEstimateMode", value);
          }}
        >
          <option value="time">Time steps (2h, 4h, 8h, ...)</option>
          <option value="value">Value steps (20, 40, 80, ...)</option>
        </Select>
      </chakra.div>
    </HStack>
  );
};

export default memo(ResinEstimateModeSwitch);
