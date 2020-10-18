import { useConfig } from "./configs";

import { useEffect, useState } from "preact/hooks";
import { DaysOfWeek } from "./db/domainDropSets";

export function useServerDate() {
  const [server] = useConfig("server");

  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;

  let offset: number;

  switch (server) {
    case "America":
      offset = -5;
      break;

    case "Europe":
      offset = 1;
      break;

    case "Asia":
      offset = 8;
      break;
  }

  return new Date(utc + 3600000 * offset);
}

export function useRerenderFrequency(interval: number) {
  const [, update] = useState(0);

  useEffect(() => {
    const handle = setInterval(() => {
      update(i => i + 1);
    }, interval);

    return () => {
      clearInterval(handle);
    };
  }, [interval]);
}

export const ServerResetHour = 4;

export function getServerNextReset(serverDate: Date) {
  return new Date(
    serverDate.getFullYear(),
    serverDate.getMonth(),
    serverDate.getDate() + (serverDate.getHours() < ServerResetHour ? 0 : 1),
    4 // 4AM
  );
}

export function getServerDayOfWeek(serverDate: Date) {
  return DaysOfWeek[
    (7 +
      (serverDate.getDay() +
        (serverDate.getHours() < ServerResetHour ? -1 : 0))) %
      7
  ];
}
