import React, { memo } from "react";
import { chakra, HStack, Icon, Select } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage, useIntl } from "react-intl";
import { Divide } from "react-feather";

const ResinEstimateModeSwitch = () => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useConfig("resinEstimateMode");

  return (
    <HStack w="full" spacing={4}>
      <HStack spacing={2}>
        <Icon as={Divide} />
        <div>
          <FormattedMessage defaultMessage="Resin estimation mode" />
        </div>
      </HStack>

      <chakra.div w="full" maxW="xs">
        <Select
          value={value}
          onChange={({ currentTarget: { value } }) => {
            setValue(value as any);
            trackEvent("resinEstimateMode", value);
          }}
        >
          <option value="time">{formatMessage({ defaultMessage: "Time steps (2h, 4h, 8h…)" })}</option>
          <option value="value">{formatMessage({ defaultMessage: "Value steps (20, 40, 60)" })}</option>
        </Select>
      </chakra.div>
    </HStack>
  );
};

export default memo(ResinEstimateModeSwitch);
