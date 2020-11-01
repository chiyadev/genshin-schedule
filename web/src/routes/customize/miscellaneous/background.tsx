import React, { memo } from "react";
import Checkbox from "../../../checkbox";
import { useConfig } from "../../../configs";
import { trackEvent } from "../../../track";

export const BackgroundDesc = "Emergency food";

const Background = () => {
  const [background, setBackground] = useConfig("paimonBg");

  return (
    <Checkbox
      value={background}
      setValue={(v) => {
        setBackground(v);
        trackEvent("background", "toggle");
      }}
    >
      {BackgroundDesc}
    </Checkbox>
  );
};

export default memo(Background);
