import { css, cx } from "emotion";

import { h } from "preact";
import MapCore from "../../map";
import { Link } from "preact-router";
import { FaAngleRight } from "react-icons/fa";
import { memo } from "preact/compat";

const Map = () => {
  return (
    <div className="space-y-1">
      <MapCore
        minimal
        className={cx(
          "w-full rounded shadow-lg",
          css`
            height: 26rem;
            background: rgba(0, 0, 0, 0.1) !important;
          `
        )}
      />

      <div className="text-right text-xs">
        <Link href="/map">
          <span className="align-middle">Open map</span>
          <FaAngleRight className="inline" />
        </Link>
      </div>
    </div>
  );
};

export default memo(Map);
