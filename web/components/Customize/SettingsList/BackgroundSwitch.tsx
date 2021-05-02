import React, { memo } from "react";
import { HStack, Icon, Select } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { FaImage } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage, useIntl } from "react-intl";

const BackgroundSwitch = () => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useConfig("background");

  return (
    <HStack spacing={4}>
      <HStack spacing={2}>
        <Icon as={FaImage} />
        <div>
          <FormattedMessage id="background" />
        </div>
      </HStack>

      <Select
        value={value}
        onChange={({ currentTarget: { value } }) => {
          setValue(value as any);
          trackEvent("background", value);
        }}
      >
        <option value="paimon">{formatMessage({ id: "Paimon" })}</option>
        <option value="klee">{formatMessage({ id: "Klee" })}</option>
        <option value="zhongli">{formatMessage({ id: "Zhongli" })}</option>
        <option value="none">{formatMessage({ id: "disabled" })}</option>
      </Select>
    </HStack>
  );
};

export default memo(BackgroundSwitch);
