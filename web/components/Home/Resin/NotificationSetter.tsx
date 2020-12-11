import { memo } from "react";
import { ResinCap, ResinsPerMinute } from "../../../db/resins";
import { DateTime } from "luxon";
import { useConfig, useSyncEffect } from "../../../utils/configs";
import { createApiClient } from "../../../utils/api";
import { Resin } from "../../../assets";
import { useServerTime } from "../../../utils/time";
import { useColorHex } from "../../../utils/theme";
import { useRouter } from "next/router";

const NotificationSetter = () => {
  const time = useServerTime(60000);
  const [resin] = useConfig("resin");

  const { asPath } = useRouter();
  const color = useColorHex("blue.500");

  const capTime = DateTime.fromMillis(resin.time)
    .plus({ minutes: (ResinCap - resin.value) / ResinsPerMinute })
    .valueOf();

  const capped = capTime < time.valueOf();

  useSyncEffect(async () => {
    const client = createApiClient();

    if (capped) {
      await client.deleteNotification("resin");
    } else {
      await client.setNotification({
        key: "resin",
        time: capTime,
        icon: Resin,
        title: "Resin Recharged!",
        description: "Your resins have been fully recharged, traveler~",
        url: asPath,
        color,
      });
    }
  }, [capped, capTime, asPath, color]);

  return null;
};

export default memo(NotificationSetter);
