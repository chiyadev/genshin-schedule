import React, { memo } from "react";
import { HStack, Icon, Select } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { FaGlobeAsia } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage, useIntl } from "react-intl";
import { LanguageNames, Languages } from "../../../langs";

const LanguageSwitch = () => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useConfig("language");

  return (
    <HStack spacing={4}>
      <HStack spacing={2}>
        <Icon as={FaGlobeAsia} />
        <div>
          <FormattedMessage defaultMessage="Language" />
        </div>
      </HStack>

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
        {Languages.map((lang) => (
          <option key={lang} value={lang}>
            {LanguageNames[lang]}
          </option>
        ))}

        <option value="contribute">({formatMessage({ defaultMessage: "Add new language" })})</option>
      </Select>
    </HStack>
  );
};

export default memo(LanguageSwitch);
