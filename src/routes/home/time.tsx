import { h } from "preact";
import { useRerenderFrequency, useServerDate } from "../../time";
import { Configs, useConfig } from "../../configs";
import { FaClock } from "react-icons/fa";

const Time = () => {
  const date = useServerDate();

  useRerenderFrequency(100);

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

  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ][date.getDay()];

  const resetDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + (date.getHours() < 4 ? 0 : 1),
    4 // 4AM
  );

  const resetCooldown = resetDate.getTime() - date.getTime();
  const resetHours = Math.floor(resetCooldown / 3600000);
  const resetMinutes = Math.round(resetCooldown / 60000);

  return (
    <div className="text-center">
      <div>
        <FaClock className="inline" /> Time in Teyvat (<ServerText />)
      </div>

      <div className="font-bold text-4xl">
        &lt; {hour}:{minute}:{second} &gt;
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

        <span> until reset</span>
      </div>
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

export default Time;
