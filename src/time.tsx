import { useConfig } from "./configs";
import { useEffect, useState } from "preact/hooks";

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
