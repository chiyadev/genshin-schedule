import { memo, useMemo } from "react";
import { ResinCap, ResinsPerMinute } from "../../../db/resins";
import { DateTime } from "luxon";
import { useApiNotification, useConfig } from "../../../utils/configs";
import { Resin } from "../../../assets";
import { useServerTime } from "../../../utils/time";
import { useColorHex } from "../../../utils/theme";

const NotificationSetter = () => {
  const time = useServerTime(60000);
  const [resin] = useConfig("resin");

  const color = useColorHex("blue.500");

  const capTime = DateTime.fromMillis(resin.time)
    .plus({ minutes: (ResinCap - resin.value) / ResinsPerMinute })
    .valueOf();

  useApiNotification(
    useMemo(
      () => ({
        key: "resin",
        time: capTime,
        icon: Resin,
        title: "Resin recharged!",
        description: "Your resins have been fully recharged, traveler~",
        url: "/",
        color,
      }),
      [capTime, color]
    ),
    time.valueOf() < capTime
  );

  return null;
};

export default memo(NotificationSetter);
