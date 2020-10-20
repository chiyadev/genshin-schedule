import { Task, useConfig } from "./configs";
import { Marker } from "react-leaflet";
import { ComponentChildren, h } from "preact";
import {
  StateUpdater,
  useEffect,
  useMemo,
  useRef,
  useState
} from "preact/hooks";
import L from "leaflet";
import { FaAngleLeft, FaSyncAlt } from "react-icons/fa";
import { MemorySearch } from "./memorySearch";
import MapPopup from "./mapPopup";
import { cx } from "emotion";
import { memo } from "preact/compat";

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

type Page = "Info" | "Icon";
const pages: Page[] = ["Info", "Icon"];

const MapTaskMarker = ({
  task,
  setTask,
  alwaysOpen,
  onOpen,
  onClose,
  footer
}: {
  task: Task;
  setTask: StateUpdater<Task>;
  alwaysOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  footer?: ComponentChildren;
}) => {
  const markerRef = useRef<any>(null);
  const markerIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: `/assets/game/${task.icon}.png`,
        iconSize: [32, 32]
      }),
    [task.icon]
  );

  const [focusedTask, setFocusedTask] = useConfig("mapFocusedTask");
  const focused = focusedTask === task.id;

  useEffect(() => {
    if (alwaysOpen || focused) {
      markerRef.current.leafletElement.openPopup();
    }
  }, [task, focused, alwaysOpen]);

  const [page, setPage] = useState<Page>(pages[0]);

  return (
    <Marker ref={markerRef} position={task.location} icon={markerIcon}>
      <MapPopup
        divide
        onOpen={() => {
          onOpen?.();
          setFocusedTask(task.id);
        }}
        onClose={() => {
          onClose?.();
          focused && setFocusedTask(false);
        }}
      >
        {page === "Info" ? (
          <InfoPage
            task={task}
            setTask={setTask}
            setPage={setPage}
            autoFocus={alwaysOpen}
          />
        ) : page === "Icon" ? (
          <IconPage setTask={setTask} setPage={setPage} />
        ) : null}

        <div
          className={cx("py-2 space-x-2 text-xs flex flex-row", {
            "justify-end": page === "Info"
          })}
        >
          {page === "Info" ? (
            footer
          ) : (
            <div className="cursor-pointer" onClick={() => setPage("Info")}>
              <FaAngleLeft className="inline" />
              <span className="align-middle"> Back</span>
            </div>
          )}
        </div>
      </MapPopup>
    </Marker>
  );
};

const InfoPage = ({
  task,
  setTask,
  setPage,
  autoFocus
}: {
  task: Task;
  setTask: StateUpdater<Task>;
  setPage: StateUpdater<Page>;
  autoFocus?: boolean;
}) => {
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      nameRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="py-2 flex flex-col space-y-2">
      <input
        ref={nameRef}
        value={task.name}
        onInput={({ currentTarget: { value } }) => {
          setTask(task => ({ ...task, name: value }));
        }}
        className="font-bold"
        placeholder={task.icon}
      />

      <textarea
        value={task.description || ""}
        onInput={({ currentTarget: { value } }) => {
          setTask(task => ({ ...task, description: value }));
        }}
        className="text-sm text-gray-600 resize-none h-12"
        placeholder="Task description"
      />

      <div
        className="text-xs flex flex-row cursor-pointer"
        onClick={() => setPage("Icon")}
      >
        <img
          alt={task.icon}
          src={`/assets/game/${task.icon}.png`}
          className="w-4 h-4 object-contain inline"
        />
        <span> Icon</span>
      </div>

      <IntervalPicker
        value={task.refreshTime}
        setValue={value => setTask(task => ({ ...task, refreshTime: value }))}
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
  setTask,
  setPage
}: {
  setTask: StateUpdater<Task>;
  setPage: StateUpdater<Page>;
}) => {
  const [search, setSearch] = useConfig("iconQuery");
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
                alt={icon}
                src={`/assets/game/${icon}.png`}
                className="w-8 h-8 object-contain inline-block cursor-pointer pointer-events-auto"
                onClick={() => {
                  setTask(task => ({ ...task, name: icon, icon }));
                  setPage("Info");
                }}
              />
            )),
          [results, setPage, setTask]
        )}
      </div>
    </div>
  );
};

export default memo(MapTaskMarker);
