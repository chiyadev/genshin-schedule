import Checkbox from "../../../checkbox";
import { h } from "preact";
import { useConfig } from "../../../configs";
import { memo } from "preact/compat";

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
