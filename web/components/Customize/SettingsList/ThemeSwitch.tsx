import React, { memo } from "react";
import { HStack, Icon, Stat, StatLabel, StatNumber, Switch } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage } from "react-intl";
import { Aperture } from "react-feather";

const ThemeSwitch = () => {
  const [value, setValue] = useConfig("theme");

  return (
    <Stat>
      <StatLabel>
        <HStack spacing={2}>
          <Icon as={Aperture} />
          <div>
            <FormattedMessage defaultMessage="Dark mode" />
          </div>
        </HStack>
      </StatLabel>

      <StatNumber>
        <Switch
          isChecked={value === "dark"}
          onChange={({ currentTarget: { checked } }) => {
            setValue(checked ? "dark" : "light");
            trackEvent("theme", checked ? "dark" : "light");
          }}
        />
      </StatNumber>
    </Stat>
  );
};

export default memo(ThemeSwitch);
