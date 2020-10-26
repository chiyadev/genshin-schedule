import { h } from "preact";
import { FaClock } from "react-icons/fa";
import { memo } from "preact/compat";
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
