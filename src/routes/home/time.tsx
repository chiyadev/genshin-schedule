import { h } from "preact";
import {
  getServerDayOfWeek,
  getServerNextReset,
  useServerDate
} from "../../time";
import { Configs, useConfig } from "../../configs";
import { FaClock } from "react-icons/fa";
import { clampResin, getResinRecharge } from "../../db/resins";
import { memo } from "preact/compat";

const Time = () => {
  const date = useServerDate();
  const [offset, setOffset] = useConfig("offsetDays");

  const hour = date
    .getHours()
    .toString()
    .padStart(2, "0");

  const minute = date
    .getMinutes()
    .toString()
    .padStart(2, "0");

  const second = date
    .getSeconds()
    .toString()
    .padStart(2, "0");

  const dayOfWeek = getServerDayOfWeek(date);
  const resetDate = getServerNextReset(date);

  const resetTime = resetDate.getTime() - date.getTime();
  const resetHours = Math.floor(resetTime / 3600000);
  const resetMinutes = Math.round(resetTime / 60000);
  const resetResins = clampResin(getResinRecharge(resetTime));

  return (
    <div className="text-center">
      <div>
        <FaClock className="inline" /> Time in Teyvat (<ServerText />)
      </div>

      <div className="font-bold text-4xl">
        <span className="cursor-pointer" onClick={() => setOffset(offset - 1)}>
          &lt;
        </span>

        <span> {hour}</span>
        <span>:{minute}:</span>
        <span>{second} </span>

        <span className="cursor-pointer" onClick={() => setOffset(offset + 1)}>
          &gt;
        </span>
      </div>

      <div className="text-xs text-gray-600">
        <span>{dayOfWeek}, </span>

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

      {offset !== 0 && (
        <div
          className="text-xs text-red-600 font-bold cursor-pointer"
          onClick={() => setOffset(0)}
        >
          Showing schedule in {offset >= 0 ? "+" : "-"}
          {Math.abs(offset)} day{Math.abs(offset) !== 1 && "s"}
        </div>
      )}
    </div>
  );
};

const serverList: Configs["server"][] = ["America", "Europe", "Asia"];

const ServerText = () => {
  const [server, setServer] = useConfig("server");

  return (
    <strong
      className="cursor-pointer"
      onClick={() => {
        setServer(
          serverList[(serverList.indexOf(server) + 1) % serverList.length]
        );
      }}
    >
      {server}
    </strong>
  );
};

export default memo(Time);
