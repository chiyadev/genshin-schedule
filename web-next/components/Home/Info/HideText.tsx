import React, { memo } from "react";
import { useConfig } from "../../../utils/configs";
import { trackEvent } from "../../../utils/umami";
import { Checkbox } from "@chakra-ui/react";

const HideText = () => {
  const [hidden, setHidden] = useConfig("hiddenWidgets");

  return (
    <Checkbox
      isChecked={!!hidden.info}
      onChange={({ target: { checked } }) => {
        setHidden((widgets) => ({ ...widgets, info: checked }));
        trackEvent("info", "hide");
      }}
    >
      Do not show again
    </Checkbox>
  );
};

export default memo(HideText);
