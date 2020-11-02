import React, { memo } from "react";
import { useConfig } from "../../../configs";
import Checkbox from "../../../checkbox";
import { trackEvent } from "../../../track";

const Hide = () => {
  const [hidden, setHidden] = useConfig("hiddenWidgets");

  return (
    <Checkbox
      value={!!hidden.info}
      setValue={(v) => {
        setHidden((widgets) => ({ ...widgets, info: true }));
        trackEvent("info", "hide");
      }}
    >
      Do not show again
    </Checkbox>
  );
};

export default memo(Hide);
