import { useConfig } from "../../../configs";
import Checkbox from "../../../checkbox";
import { h } from "preact";
import { memo } from "preact/compat";

const Hide = () => {
  const [visible, setVisible] = useConfig("showSiteInfo");

  return (
    <Checkbox value={!visible} setValue={v => setVisible(!v)}>
      Do not show again
    </Checkbox>
  );
};

export default memo(Hide);
