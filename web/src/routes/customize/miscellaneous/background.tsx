import React, { memo } from "react";
import Checkbox from "../../../checkbox";
import { useConfig } from "../../../configs";

export const BackgroundDesc = "Emergency food";

const Background = () => {
  const [background, setBackground] = useConfig("paimonBg");

  return (
    <Checkbox value={background} setValue={setBackground}>
      {BackgroundDesc}
    </Checkbox>
  );
};

export default memo(Background);
