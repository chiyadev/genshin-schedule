import { useEffect, useState } from "react";
import { useConfig } from "./configs";

export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export const DaysOfWeek: DayOfWeek[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const rerenderCallbacks = new Set<() => void>();

setInterval(() => {
  rerenderCallbacks.forEach((callback) => callback());
});

export function useServerDate(frequency = 100) {
  const [count, setCount] = useState(() => Math.floor(Date.now() / frequency));

  useEffect(() => {
    const tick = () => {
      // this allows hooks with the same frequency to rerender at the same time
      const current = Math.floor(Date.now() / frequency);
      current !== count && setCount(current);
    };

    rerenderCallbacks.add(tick);

    return () => {
      rerenderCallbacks.delete(tick);
    };
  }, [count, frequency]);

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

export type TimeUnit = "week" | "day" | "hour" | "minute";
export const TimeUnits: TimeUnit[] = ["week", "day", "hour", "minute"];

export function getTimeUnitMs(unit: TimeUnit) {
  switch (unit) {
    case "minute":
      return 60000;

    case "hour":
      return 3600000;

    case "day":
      return 86400000;

    case "week":
      return 604800000;
  }
}

export function getBestTimeUnit(ms: number) {
  for (const unit of TimeUnits) {
    if (ms % getTimeUnitMs(unit) === 0) {
      return unit;
    }
  }

  return "minute";
}

export function getLargestTimeUnit(ms: number) {
  for (const unit of TimeUnits) {
    if (ms >= getTimeUnitMs(unit)) {
      return unit;
    }
  }

  return "minute";
}
