import React, { memo } from "react";
import { HStack, Icon, Switch } from "@chakra-ui/react";
import { FaPaintRoller } from "react-icons/fa";
import { useConfig } from "../../../utils/config";

const ThemeSwitch = () => {
  const [value, setValue] = useConfig("theme");

  return (
    <HStack spacing={4}>
      <HStack spacing={2}>
        <Icon as={FaPaintRoller} />
        <div>Dark mode</div>
      </HStack>

      <Switch
        isChecked={value === "dark"}
        onChange={({ currentTarget: { checked } }) => setValue(checked ? "dark" : "light")}
      />
    </HStack>
  );
};

export default memo(ThemeSwitch);
