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
  const [notifyMark] = useConfig("resinNotifyMark");

  const color = useColorHex("blue.300");

  const capTime = DateTime.fromMillis(resin.time)
    .plus({ minutes: (notifyMark - resin.value) / ResinsPerMinute })
    .valueOf();

  useApiNotification(
    useMemo(
      () => ({
        key: "resin",
        time: capTime,
        icon: Resin,
        title: "Resins recharged!",
        description:
          notifyMark === ResinCap ? "Your resins have fully recharged!" : `You have ${notifyMark} resins right now!`,
        url: "/home",
        color,
      }),
      [capTime, color, notifyMark]
    ),
    time.valueOf() < capTime
  );

  return null;
};

export default memo(NotificationSetter);
