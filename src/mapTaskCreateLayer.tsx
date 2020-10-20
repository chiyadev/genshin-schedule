import { Task, useConfig, useTaskCreator } from "./configs";
import { Marker, Popup } from "react-leaflet";
import { ComponentProps, h } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import L from "leaflet";
import { css } from "emotion";
import { FaAngleLeft, FaCheck, FaSyncAlt } from "react-icons/fa";
import { MemorySearch } from "./memorySearch";
import MapPopup from "./mapPopup";

const MapTaskCreateLayer = () => {
  const [task, setTask] = useConfig("mapCreateTask");
  const [, setDefaultTask] = useConfig("mapDefaultTask");

  if (!task) {
    return null;
  }

  return (
    <Inner
      task={task}
      setTask={task => {
        setTask(task);

        if (task) {
          setDefaultTask({
            name: task.name,
            icon: task.icon,
            refreshTime: task.refreshTime
          });
        }
      }}
    />
  );
};

type TimeUnit = "week" | "day" | "hour" | "minute";

function getUnitMs(unit: TimeUnit) {
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

type PopupPage = "Info" | "Icon";
const PopupPages: PopupPage[] = ["Info", "Icon"];

const Inner = ({
  task,
  setTask
}: {
  task: Task;
  setTask: (task: Task | null) => void;
}) => {
  const markerIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: `/assets/game/${task.icon}.png`,
        iconSize: [32, 32]
      }),
    [task.icon]
  );

  const markerRef = useRef<any>(null);

  useEffect(() => markerRef.current.leafletElement.openPopup(), [task]);

  const [page, setPage] = useState<PopupPage>(PopupPages[0]);

  return (
    <Marker ref={markerRef} position={task.location} icon={markerIcon}>
      <MapPopup divide onClose={() => setTask(null)}>
        {page === "Info" ? (
          <InfoPage
            task={task}
            setTask={setTask}
            page={page}
            setPage={setPage}
          />
        ) : page === "Icon" ? (
          <IconPage
            task={task}
            setTask={setTask}
            page={page}
            setPage={setPage}
          />
        ) : null}

        <Menu task={task} setTask={setTask} page={page} setPage={setPage} />
      </MapPopup>
    </Marker>
  );
};

const InfoPage = ({
  task,
  setTask,
  setPage
}: ComponentProps<typeof Inner> & {
  page: PopupPage;
  setPage: (page: PopupPage) => void;
}) => {
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => nameRef.current.focus(), []);

  return (
    <div className="py-2 flex flex-col space-y-2">
      <input
        ref={nameRef}
        value={task.name}
        onInput={({ currentTarget: { value } }) => {
          setTask({ ...task, name: value });
        }}
        className="font-bold"
        placeholder={task.icon}
      />

      <textarea
        value={task.description || ""}
        onInput={({ currentTarget: { value } }) => {
          setTask({ ...task, description: value });
        }}
        className="text-sm text-gray-600 resize-none h-12"
        placeholder="Task description"
      />

      <div
        className="text-xs flex flex-row cursor-pointer"
        onClick={() => setPage("Icon")}
      >
        <img
          src={`/assets/game/${task.icon}.png`}
          className="w-4 h-4 object-contain inline"
        />
        <span> Icon</span>
      </div>

      <IntervalPicker
        value={task.refreshTime}
        setValue={value => setTask({ ...task, refreshTime: value })}
      />
    </div>
  );
};

const IntervalPicker = ({
  value,
  setValue
}: {
  value: number;
  setValue: (value: number) => void;
}) => {
  const [unit, setUnit] = useState<TimeUnit>(() => {
    for (const unit of ["week", "day", "hour", "minute"] as TimeUnit[]) {
      if (value % getUnitMs(unit) === 0) {
        return unit;
      }
    }

    return "minute";
  });

  return (
    <div className="flex flex-row text-xs">
      <div>
        <FaSyncAlt className="inline" />
        <span className="align-middle"> Refreshes every:</span>
      </div>

      <input
        type="number"
        min={1}
        value={Math.round(value / getUnitMs(unit))}
        onInput={({ currentTarget: { valueAsNumber } }) => {
          setValue((valueAsNumber || 1) * getUnitMs(unit));
        }}
        className="text-right flex-1 min-w-0"
      />

      <select
        value={unit}
        onChange={({ currentTarget: { value } }) => setUnit(value as TimeUnit)}
      >
        <option value="week">Weeks</option>
        <option value="day">Days</option>
        <option value="hour">Hours</option>
        <option value="minute">Minutes</option>
      </select>
    </div>
  );
};

const icons = ["Iron Chunk", "White Iron Chunk", "Crystal Chunk"];
const iconDb = new MemorySearch<string>();

for (const icon of icons) {
  iconDb.add(icon, icon);
}

const IconPage = ({
  task,
  setTask,
  setPage
}: ComponentProps<typeof InfoPage>) => {
  const [search, setSearch] = useState("");
  const results = useMemo(() => iconDb.search(search), [search]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current.focus(), []);

  return (
    <div className="py-2 flex flex-col space-y-2">
      <input
        ref={inputRef}
        value={search}
        onInput={({ currentTarget: { value } }) => setSearch(value)}
        className="text-sm"
        placeholder="Search icons"
      />

      <div className="w-64 h-32 overflow-y-auto">
        {useMemo(
          () =>
            results.map(icon => (
              <img
                key={icon}
                src={`/assets/game/${icon}.png`}
                className="w-8 h-8 object-contain inline-block cursor-pointer pointer-events-auto"
                onClick={() => {
                  setTask({ ...task, name: icon, icon });
                  setPage("Info");
                }}
              />
            )),
          [results]
        )}
      </div>
    </div>
  );
};

const Menu = ({
  task,
  setTask,
  page,
  setPage
}: ComponentProps<typeof InfoPage>) => {
  const createTask = useTaskCreator();

  return (
    <div className="py-2 space-x-2 text-xs flex flex-row">
      {page !== "Info" && (
        <div className="cursor-pointer" onClick={() => setPage("Info")}>
          <FaAngleLeft className="inline" />
          <span className="align-middle"> Back</span>
        </div>
      )}

      <div className="flex-1" />

      <div
        className="cursor-pointer"
        onClick={() => {
          createTask(task);
          setTask(null);
        }}
      >
        <FaCheck className="inline" />
        <span className="align-middle"> Create</span>
      </div>
    </div>
  );
};

export default MapTaskCreateLayer;
