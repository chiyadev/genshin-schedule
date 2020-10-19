import { useConfig } from "./configs";
import { useEffect, useState } from "preact/hooks";
import { DaysOfWeek } from "./db/domainDropSets";

export function useServerDate() {
  const [server] = useConfig("server");
  const [offsetDays] = useConfig("offsetDays");

  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;

  let offsetHours: number;

  switch (server) {
    case "America":
      offsetHours = -5;
      break;

    case "Europe":
      offsetHours = 1;
      break;

    case "Asia":
      offsetHours = 8;
      break;
  }

  return new Date(utc + 3600000 * offsetHours + 86400000 * offsetDays);
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
