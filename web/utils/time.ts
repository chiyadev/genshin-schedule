import { useEffect, useState } from "react";
import { useConfig } from "./configs";
import { DateTime, Duration } from "luxon";
import pluralize from "pluralize";

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

  const [server] = useConfig("server");
  const [offsetDays] = useConfig("offsetDays");

  let offsetHours: number;

  switch (server) {
    case "America":
      offsetHours = -5;
      break;

    case "Europe":
      offsetHours = 1;
      break;

    case "Asia":
    case "TW, HK, MO":
      offsetHours = 8;
      break;
  }

  // this is not actually correct, proper implementation should not modify the hour part and instead use setZone
  // but this behavior must be kept in order to preserve backward compatibility with existing data
  return DateTime.utc().plus({ hours: offsetHours, days: offsetDays });

  // return DateTime.utc().plus({ days: offsetDays }).setZone(`UTC${offsetHours}`)
}

export const ServerResetHour = 4;

export function getServerResetTime(time: DateTime) {
  const utc = time.toUTC();

  return DateTime.utc(utc.year, utc.month, utc.day, utc.hour)
    .setZone(time.zone)
    .plus({ days: time.hour < ServerResetHour ? 0 : 1 })
    .set({ hour: ServerResetHour });
}

export type Weekday = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
export const Weekdays: Weekday[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

export function formatTimeSimple(time: DateTime, units: Exclude<TimeUnit, "year" | "week">[]) {
  const parts: string[] = [];

  for (const unit of units) {
    parts.push(time.get(unit).toString().padStart(2, "0"));
  }

  return parts.join(":");
}

export function formatDurationSimple(duration: Duration, units = TimeUnits) {
  const parts: string[] = [];

  for (const unit of units) {
    const unitIndex = TimeUnits.indexOf(unit);

    let value = duration.as(unit);

    if (parts.length && unitIndex >= 1) {
      value %= TimeUnitSizes[unitIndex - 1];
    }

    value = Math.floor(value);

    if (value) {
      parts.push(`${value} ${pluralize(unit, value)}`);
    }
  }

  return parts.join(" ");
}

export function formatDurationPartSimple(duration: Duration, unit: TimeUnit) {
  const value = Math.floor(duration.as(unit));

  return `${value} ${pluralize(unit, value)}`;
}
