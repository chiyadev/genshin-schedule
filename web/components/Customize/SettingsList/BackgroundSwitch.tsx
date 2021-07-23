import React, { memo } from "react";
import { HStack, Icon, Select, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage, useIntl } from "react-intl";
import { Image } from "react-feather";

const BackgroundSwitch = () => {
  const { formatMessage, formatMessage: formatMessageId } = useIntl();
  const [value, setValue] = useConfig("background");

  return (
    <Stat>
      <StatLabel mb={1}>
        <HStack spacing={2}>
          <Icon as={Image} />
          <div>
            <FormattedMessage defaultMessage="Background" />
          </div>
        </HStack>
      </StatLabel>

      <StatNumber>
        <Select
          value={value}
          onChange={({ currentTarget: { value } }) => {
            setValue(value as any);
            trackEvent("background", value);
          }}
        >
          <option value="paimon">{formatMessageId({ id: "Paimon" })}</option>
          <option value="klee">{formatMessageId({ id: "Klee" })}</option>
          <option value="diluc">{formatMessageId({ id: "Diluc" })}</option>
          <option value="tartaglia">{formatMessageId({ id: "Tartaglia" })}</option>
          <option value="zhongli">{formatMessageId({ id: "Zhongli" })}</option>
          <option value="xiao">{formatMessageId({ id: "Xiao" })}</option>
          <option value="hutao">{formatMessageId({ id: "Hu Tao" })}</option>
          <option value="kazuha">{formatMessageId({ id: "Kazuha" })}</option>
          <option value="ayaka">{formatMessageId({ id: "Ayaka" })}</option>
          <option value="none">{formatMessage({ defaultMessage: "Disabled" })}</option>
        </Select>
      </StatNumber>
    </Stat>
  );
};

export default memo(BackgroundSwitch);
