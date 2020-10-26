import MapCore from "../../map";
import { h } from "preact";
import { css, cx } from "emotion";
import { useTabTitle } from "../../utils";
import { memo } from "preact/compat";
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
