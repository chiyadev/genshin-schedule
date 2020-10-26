import { h } from "preact";
import {
  getServerDayOfWeek,
  getServerNextReset,
  useServerDate
} from "../../../time";
import { clampResin, getResinRecharge } from "../../../db/resins";
import { memo } from "preact/compat";

const Date = () => {
  const date = useServerDate();

  const resetDate = getServerNextReset(date);
  const resetTime = resetDate.getTime() - date.getTime();
  const resetHours = Math.floor(resetTime / 3600000);
  const resetMinutes = Math.round(resetTime / 60000);
  const resetResins = clampResin(getResinRecharge(resetTime));

  return (
    <div className="text-xs text-gray-600">
      <span>{getServerDayOfWeek(date)}, </span>

      {resetMinutes > 60 ? (
        <span>
          {resetHours} hour{resetHours !== 1 && "s"}
        </span>
      ) : (
        <span>
          {resetMinutes} minute{resetMinutes !== 1 && "s"}
        </span>
      )}

      <span> until reset </span>

      {resetResins < 120 && (
        <span>
          (+{resetResins} resin{resetResins !== 1 && "s"})
        </span>
      )}
    </div>
  );
};

export default memo(Date);
