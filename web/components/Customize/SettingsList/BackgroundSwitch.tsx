import React, { memo } from "react";
import { HStack, Icon, Select } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { FaImage } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage, useIntl } from "react-intl";

const BackgroundSwitch = () => {
  const { formatMessage, formatMessage: formatMessageId } = useIntl();
  const [value, setValue] = useConfig("background");

  return (
    <HStack spacing={4}>
      <HStack spacing={2}>
        <Icon as={FaImage} />
        <div>
          <FormattedMessage defaultMessage="Background" />
        </div>
      </HStack>

      <Select
        value={value}
        onChange={({ currentTarget: { value } }) => {
          setValue(value as any);
          trackEvent("background", value);
        }}
      >
        <option value="paimon">{formatMessageId({ id: "Paimon" })}</option>
        <option value="klee">{formatMessageId({ id: "Klee" })}</option>
        <option value="zhongli">{formatMessageId({ id: "Zhongli" })}</option>
        <option value="none">{formatMessage({ defaultMessage: "Disabled" })}</option>
      </Select>
    </HStack>
  );
};

export default memo(BackgroundSwitch);
