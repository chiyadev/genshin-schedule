import React, { memo } from "react";
import { Task } from "../../../configs";
import {
  getLargestTimeUnit,
  getTimeUnitMs,
  useServerDate,
} from "../../../time";
import { cx } from "emotion";
import { FaClock } from "react-icons/fa";

const DueText = ({ task }: { task: Task }) => {
  const date = useServerDate(60000);
  const delta = task.dueTime - date.getTime();
  const unit = getLargestTimeUnit(Math.abs(delta));
  const displayValue = Math.round(delta / getTimeUnitMs(unit));

  return (
    <div className={cx("text-xs", { "text-red-600": displayValue <= 0 })}>
      <FaClock className="inline" />

      <span className="align-middle">
        {" "}
        {displayValue === 0 ? (
          <span>Due now</span>
        ) : displayValue > 0 ? (
          <span>
            Due in {displayValue} {unit}
            {displayValue !== 1 && "s"}
          </span>
        ) : (
          <span>
            Due {-displayValue} {unit}
            {-displayValue !== 1 && "s"} ago
          </span>
        )}
      </span>
    </div>
  );
};

export default memo(DueText);
