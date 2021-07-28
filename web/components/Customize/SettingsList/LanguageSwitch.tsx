import React, { memo } from "react";
import { HStack, Icon, Select, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage, useIntl } from "react-intl";
import { LanguageNames, Languages } from "../../../langs";
import { Globe } from "react-feather";

const LanguageSwitch = () => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useConfig("language");

  return (
    <Stat>
      <StatLabel mb={1}>
        <HStack spacing={2}>
          <Icon as={Globe} />
          <div>
            <FormattedMessage defaultMessage="Language" />
          </div>
        </HStack>
      </StatLabel>

      <StatNumber>
        <Select
          value={value}
          onChange={({ currentTarget: { value } }) => {
            if (value === "contribute") {
              window.open("https://github.com/chiyadev/genshin-schedule/tree/master/web/langs");
            } else {
              setValue(value as any);
              trackEvent("background", value);
            }
          }}
        >
          <option value="default">{formatMessage({ defaultMessage: "Default" })}</option>

          {Languages.map((lang) => (
            <option key={lang} value={lang}>
              {LanguageNames[lang]}
            </option>
          ))}

          <option value="contribute">({formatMessage({ defaultMessage: "Add new language" })})</option>
        </Select>
      </StatNumber>
    </Stat>
  );
};

export default memo(LanguageSwitch);
