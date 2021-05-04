import React, { memo } from "react";
import { useConfig } from "../../../utils/config";
import { useFormatDuration, useFormatTime, useServerTime } from "../../../utils/time";
import { getResinRecharge, ResinsPerMinute } from "../../../db/resins";
import { Duration } from "luxon";
import { FormattedMessage } from "react-intl";

const EstimatorByNotifyMark = () => {
  const time = useServerTime(60000);
  const [resin] = useConfig("resin");
  const [notifyMark] = useConfig("resinNotifyMark");

  const remainingResins = notifyMark - (resin.value + getResinRecharge(time.valueOf() - resin.time));
  const remainingTime = Duration.fromObject({ minutes: remainingResins / ResinsPerMinute });

  return (
    <div>
      <FormattedMessage
        defaultMessage="{value} in {time}"
        values={{
          value: notifyMark,
          time: [
            useFormatDuration(remainingTime, ["hour", "minute"]),
            `(${useFormatTime(time.plus(remainingTime), ["hour", "minute"])})`,
          ].join(" "),
        }}
      />
    </div>
  );
};

export default memo(EstimatorByNotifyMark);
