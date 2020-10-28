import React, { memo } from "react";
import MapCore from "../../map";
import { css, cx } from "emotion";
import { useTabTitle } from "../../utils";
import HeaderWrapper from "./header";
import ListOverlay from "./list";

const Map = () => {
  useTabTitle("Map");

  return (
    <div className="w-full h-screen">
      <HeaderWrapper />
      <ListOverlay />

      <MapCore
        className={cx(
          "w-full h-full",
          css`
            z-index: 0 !important;
            background: #2e313d !important;
          `
        )}
      />
    </div>
  );
};

export default memo(Map);
