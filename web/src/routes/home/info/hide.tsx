import React, { memo } from "react";
import { useConfig } from "../../../configs";
import Checkbox from "../../../checkbox";
import { trackEvent } from "../../../track";

const Hide = () => {
  const [visible, setVisible] = useConfig("showSiteInfo");

  return (
    <Checkbox
      value={!visible}
      setValue={(v) => {
        setVisible(!v);
        trackEvent("info", "hide");
      }}
    >
      Do not show again
    </Checkbox>
  );
};

export default memo(Hide);
