import { memo, useMemo } from "react";
import { ResinCap, ResinsPerMinute } from "../../../db/resins";
import { DateTime } from "luxon";
import { useApiNotification, useConfig } from "../../../utils/config";
import { Resin } from "../../../assets";
import { useServerTime } from "../../../utils/time";
import { useColorHex } from "../../../utils/theme";
import { useIntl } from "react-intl";

const NotificationSetter = () => {
  const { formatMessage } = useIntl();
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
        icon: Resin.src,
        title: formatMessage({ defaultMessage: "Resin recharged" }),
        description:
          notifyMark === ResinCap
            ? formatMessage({ defaultMessage: "Your resins have fully recharged!" })
            : formatMessage({ defaultMessage: "You have {value} resins right now!" }, { value: notifyMark }),
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
