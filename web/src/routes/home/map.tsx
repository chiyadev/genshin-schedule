import React, { memo } from "react";
import { css, cx } from "emotion";
import MapCore from "../../map";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

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
        <Link to="/map">
          <span className="align-middle">Open map</span>
          <FaAngleRight className="inline" />
        </Link>
      </div>
    </div>
  );
};

export default memo(Map);
