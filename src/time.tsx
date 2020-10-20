import { useConfig } from "./configs";
import { useEffect, useState } from "preact/hooks";
import { DaysOfWeek } from "./db/domainDropSets";

const rerenderCallbacks = new Set<() => void>();

setInterval(() => {
  rerenderCallbacks.forEach(callback => callback());
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
  }, [count]);

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
