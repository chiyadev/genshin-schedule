import { useEffect, useState } from "react";
import { TaskRefreshTime, useConfig } from "./config";
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

export function getServerResetTime(current: DateTime) {
  const utc = current.toUTC();

  return DateTime.utc(utc.year, utc.month, utc.day, utc.hour)
    .setZone(current.zone)
    .plus({ days: current.hour < ServerResetHour ? 0 : 1 })
    .set({ hour: ServerResetHour });
}

export function getNextRefreshTime(current: DateTime, refreshTime: TaskRefreshTime) {
  if (refreshTime === "reset") {
    return getServerResetTime(current);
  }

  const utc = current.toUTC();
  let local = DateTime.utc(utc.year, utc.month, utc.day, utc.hour).setZone(current.zone);

  // refresh day of week
  let rWeekday = Weekdays.indexOf(refreshTime as Weekday);
  if (rWeekday == 0) rWeekday = 7;

  // add one week if current weekday is past the refresh weekday
  const nextWeek = current.weekday > rWeekday || (current.weekday === rWeekday && current.hour >= ServerResetHour);

  return local.plus({ week: nextWeek ? 1 : 0 }).set({ weekday: rWeekday, hour: ServerResetHour });
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
  const parts: string[] = [];

  for (const unit of units) {
    const unitIndex = TimeUnits.indexOf(unit);

    let value = duration.as(unit);

    if (parts.length && unitIndex >= 1) {
      value %= TimeUnitSizes[unitIndex - 1];
    }

    value = Math.floor(value);

    const str = useFormatUnit(`duration.${unit}`, value);
    value && str && parts.push(str);
  }

  return parts.join(" ");
}

export function useFormatDurationPart(duration: Duration, unit: TimeUnit) {
  return useFormatUnit(`duration.${unit}`, Math.floor(duration.as(unit)));
}

export const FormattedUnit = ({ id, value }: { id: string; value?: number }) => {
  return <>{useFormatUnit(id, value)}</>;
};

export function useFormatUnit(name: string, value = 1) {
  const { formatMessage } = useIntl();

  switch (name) {
    case "duration.year":
      return formatMessage({ defaultMessage: "{value, plural, one {# year} other {# years}}" }, { value });
    case "duration.week":
      return formatMessage({ defaultMessage: "{value, plural, one {# week} other {# weeks}}" }, { value });
    case "duration.day":
      return formatMessage({ defaultMessage: "{value, plural, one {# day} other {# days}}" }, { value });
    case "duration.hour":
      return formatMessage({ defaultMessage: "{value, plural, one {# hour} other {# hours}}" }, { value });
    case "duration.minute":
      return formatMessage({ defaultMessage: "{value, plural, one {# minute} other {# minutes}}" }, { value });
    case "duration.second":
      return formatMessage({ defaultMessage: "{value, plural, one {# second} other {# seconds}}" }, { value });
    case "duration.millisecond":
      return formatMessage(
        { defaultMessage: "{value, plural, one {# millisecond} other {# milliseconds}}" },
        { value }
      );

    case "day.sunday":
      return formatMessage({ defaultMessage: "Sunday" });
    case "day.monday":
      return formatMessage({ defaultMessage: "Monday" });
    case "day.tuesday":
      return formatMessage({ defaultMessage: "Tuesday" });
    case "day.wednesday":
      return formatMessage({ defaultMessage: "Wednesday" });
    case "day.thursday":
      return formatMessage({ defaultMessage: "Thursday" });
    case "day.friday":
      return formatMessage({ defaultMessage: "Friday" });
    case "day.saturday":
      return formatMessage({ defaultMessage: "Saturday" });

    case "unit.year":
      return formatMessage({ defaultMessage: "Year" });
    case "unit.week":
      return formatMessage({ defaultMessage: "Week" });
    case "unit.day":
      return formatMessage({ defaultMessage: "Day" });
    case "unit.hour":
      return formatMessage({ defaultMessage: "Hour" });
    case "unit.minute":
      return formatMessage({ defaultMessage: "Minute" });
    case "unit.second":
      return formatMessage({ defaultMessage: "Second" });
    case "unit.millisecond":
      return formatMessage({ defaultMessage: "Millisecond" });
  }
}
