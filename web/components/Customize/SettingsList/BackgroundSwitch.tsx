import React, { memo } from "react";
import { HStack, Icon, Select } from "@chakra-ui/react";
import { useConfig } from "../../../utils/configs";
import { FaImage } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";

const BackgroundSwitch = () => {
  const [value, setValue] = useConfig("background");

  return (
    <HStack spacing={4}>
      <HStack spacing={2}>
        <Icon as={FaImage} />
        <div>Background</div>
      </HStack>

      <Select
        value={value}
        onChange={({ currentTarget: { value } }) => {
          setValue(value as any);
          trackEvent("background", value);
        }}
      >
        <option value="paimon">Paimon</option>
        <option value="klee">Klee</option>
        <option value="zhongli">Zhongli</option>
        <option value="none">Disabled</option>
      </Select>
    </HStack>
  );
};

export default memo(BackgroundSwitch);
