import React, { memo } from "react";
import { Checkbox } from "@chakra-ui/react";
import { useConfig } from "../../../utils/configs";
import { trackEvent } from "../../../utils/umami";

const BackgroundToggle = () => {
  const [value, setValue] = useConfig("paimonBg");

  return (
    <Checkbox
      isChecked={value}
      onChange={({ target: { checked } }) => {
        setValue(checked);
        trackEvent("background", "toggle");
      }}
    >
      Emergency food
    </Checkbox>
  );
};

export default memo(BackgroundToggle);
