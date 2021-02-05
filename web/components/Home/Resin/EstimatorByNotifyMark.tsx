import React, { memo } from "react";
import { useConfig } from "../../../utils/config";
import { formatDurationSimple, formatTimeSimple, useServerTime } from "../../../utils/time";
import { getResinRecharge, ResinsPerMinute } from "../../../db/resins";
import { Duration } from "luxon";

const EstimatorByNotifyMark = () => {
  const time = useServerTime(60000);
  const [resin] = useConfig("resin");
  const [notifyMark] = useConfig("resinNotifyMark");

  const remainingResins = notifyMark - (resin.value + getResinRecharge(time.valueOf() - resin.time));
  const remainingTime = Duration.fromObject({ minutes: remainingResins / ResinsPerMinute });

  return (
    <div>
      <span>{notifyMark} in </span>
      {[
        formatDurationSimple(remainingTime, ["hour", "minute"]),
        `(${formatTimeSimple(time.plus(remainingTime), ["hour", "minute"])})`,
      ].join(" ")}
    </div>
  );
};

export default memo(EstimatorByNotifyMark);
