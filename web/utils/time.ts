import { useEffect, useState } from "react";
import { useConfig } from "./config";
import { DateTime, Duration } from "luxon";
import { useIntl } from "react-intl";

const tickCallbacks = new Set<() => void>();

if (typeof window !== "undefined") {
  setInterval(() => {
    tickCallbacks.forEach((callback) => callback());
  });
}

export function useRerenderInterval(frequency: number) {
  const [tick, setTick] = useState(() => Math.floor(Date.now() / frequency));

  useEffect(() => {
    const handleTick = () => {
      // this allows hooks with the same frequency to rerender at the same time
      const current = Math.floor(Date.now() / frequency);
      current !== tick && setTick(current);
    };

    tickCallbacks.add(handleTick);

    return () => {
      tickCallbacks.delete(handleTick);
    };
  }, [tick, frequency]);

  return tick;
}

export function useServerTime(updateHz = 100) {
  useRerenderInterval(updateHz);

  const timeZone = useServerTimeZone();
  const [offsetDays] = useConfig("offsetDays");

  return DateTime.utc().plus({ days: offsetDays }).setZone(timeZone);
}

export function useServerTimeZone() {
  const [server] = useConfig("server");

  switch (server) {
    case "America":
      return "America/New_York";

    case "Europe":
      return "Europe/Berlin";

    case "Asia":
      return "Asia/Tokyo";

    case "TW, HK, MO":
      return "UTC+8";
  }
}

export const ServerResetHour = 4;

export function getServerResetTime(time: DateTime) {
  const utc = time.toUTC();

  return DateTime.utc(utc.year, utc.month, utc.day, utc.hour)
    .setZone(time.zone)
    .plus({ days: time.hour < ServerResetHour ? 0 : 1 })
    .set({ hour: ServerResetHour });
}

export type Weekday = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
export const Weekdays: Weekday[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export type TimeUnit = "year" | "week" | "day" | "hour" | "minute" | "second" | "millisecond";
export const TimeUnits: TimeUnit[] = ["year", "week", "day", "hour", "minute", "second", "millisecond"];
export const TimeUnitSizes: number[] = [52, 7, 24, 60, 60, 1000];

export function getUnitMs(unit: TimeUnit) {
  let value = 1;

  for (let i = TimeUnits.indexOf(unit); i < TimeUnitSizes.length; i++) {
    value *= TimeUnitSizes[i];
  }

  return value;
}

export function getLargestUnit(duration: Duration) {
  const ms = Math.abs(duration.as("milliseconds"));

  for (const unit of TimeUnits) {
    if (ms >= getUnitMs(unit)) {
      return unit;
    }
  }

  return "millisecond";
}

export function getAccuratestUnit(duration: Duration) {
  const ms = Math.abs(duration.as("milliseconds"));

  for (const unit of TimeUnits) {
    if (!(ms % getUnitMs(unit))) {
      return unit;
    }
  }

  return "millisecond";
}

export function useFormatTime(time: DateTime, units: Exclude<TimeUnit, "year" | "week">[]) {
  const parts: string[] = [];

  for (const unit of units) {
    parts.push(time.get(unit).toString().padStart(2, "0"));
  }

  return parts.join(":");
}

export function useFormatDuration(duration: Duration, units = TimeUnits) {
  const { formatMessage: formatMessageId } = useIntl();
  const parts: string[] = [];

  for (const unit of units) {
    const unitIndex = TimeUnits.indexOf(unit);

    let value = duration.as(unit);

    if (parts.length && unitIndex >= 1) {
      value %= TimeUnitSizes[unitIndex - 1];
    }

    value = Math.floor(value);

    if (value) {
      parts.push(formatMessageId({ id: `duration.${unit}` }, { value }));
    }
  }

  return parts.join(" ");
}

export function useFormatDurationPart(duration: Duration, unit: TimeUnit) {
  const { formatMessage: formatMessageId } = useIntl();
  const value = Math.floor(duration.as(unit));

  return formatMessageId({ id: `duration.${unit}` }, { value });
}
