import React, { memo } from "react";
import { FaClock } from "react-icons/fa";
import Server from "./server";
import Time from "./time";
import Date from "./date";
import OffsetAlert from "./offsetAlert";

const Clock = () => {
  return (
    <div className="text-center">
      <div>
        <FaClock className="inline" /> Time in Teyvat (<Server />)
      </div>

      <Time />
      <Date />
      <OffsetAlert />
    </div>
  );
};

export default memo(Clock);
