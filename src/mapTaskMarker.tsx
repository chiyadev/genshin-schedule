import { Task, useConfig } from "./configs";
import { Marker, MarkerProps } from "react-leaflet";
import { ComponentChildren, h, Ref } from "preact";
import {
  StateUpdater,
  useEffect,
  useMemo,
  useRef,
  useState
} from "preact/hooks";
import L from "leaflet";
import { FaAngleLeft, FaClock, FaSyncAlt } from "react-icons/fa";
import { MemorySearch } from "./memorySearch";
import MapPopup from "./mapPopup";
import { cx } from "emotion";
import { memo } from "preact/compat";
import { useServerDate } from "./time";

type TimeUnit = "week" | "day" | "hour" | "minute";
const TimeUnits: TimeUnit[] = ["week", "day", "hour", "minute"];

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

function getBestUnit(ms: number) {
  for (const unit of TimeUnits) {
    if (ms % getUnitMs(unit) === 0) {
      return unit;
    }
  }

  return "minute";
}

function getLargestUnit(ms: number) {
  for (const unit of TimeUnits) {
    if (ms >= getUnitMs(unit)) {
      return unit;
    }
  }

  return "minute";
}

type Page = "Info" | "Icon";
const pages: Page[] = ["Info", "Icon"];

const MapTaskMarker = ({
  task,
  setTask,
  alwaysOpen,
  showDue = true,
  onOpen,
  onClose,
  footer
}: {
  task: Task;
  setTask: StateUpdater<Task>;
  alwaysOpen?: boolean;
  showDue?: boolean;
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
    <InnerMarker
      task={task}
      markerRef={markerRef}
      position={task.location}
      icon={markerIcon}
    >
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
            showDue={showDue}
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
    </InnerMarker>
  );
};

const InnerMarker = ({
  task,
  markerRef,
  ...props
}: MarkerProps & {
  task: Task;
  markerRef?: Ref<typeof Marker>;
}) => {
  const date = useServerDate(60000);

  return (
    <Marker
      ref={markerRef}
      opacity={task.dueTime <= date.getTime() ? 1 : 0.5}
      {...props}
    />
  );
};

const InfoPage = ({
  task,
  setTask,
  setPage,
  autoFocus,
  showDue
}: {
  task: Task;
  setTask: StateUpdater<Task>;
  setPage: StateUpdater<Page>;
  autoFocus?: boolean;
  showDue?: boolean;
}) => {
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      nameRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="py-2 flex flex-col space-y-1">
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
        <span> Set icon</span>
      </div>

      <IntervalPicker
        value={task.refreshTime}
        setValue={value => setTask(task => ({ ...task, refreshTime: value }))}
      />

      {showDue && <DueTimeText task={task} />}
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
  const [unit, setUnit] = useState<TimeUnit>(() => getBestUnit(value));
  const displayValue = Math.round(value / getUnitMs(unit));

  return (
    <div className="flex flex-row text-xs">
      <div>
        <FaSyncAlt className="inline" />
        <span className="align-middle"> Refreshes every:</span>
      </div>

      <input
        type="number"
        min={1}
        value={displayValue}
        onInput={({ currentTarget: { valueAsNumber } }) => {
          setValue((valueAsNumber || 1) * getUnitMs(unit));
        }}
        className="text-right flex-1 min-w-0"
      />

      <select
        value={unit}
        onChange={({ currentTarget: { value } }) => setUnit(value as TimeUnit)}
      >
        {TimeUnits.map(unit => (
          <option key={unit} value={unit}>
            {unit}
            {displayValue !== 1 && "s"}
          </option>
        ))}
      </select>
    </div>
  );
};

const DueTimeText = ({ task }: { task: Task }) => {
  const date = useServerDate(60000);
  const delta = task.dueTime - date.getTime();
  const unit = getLargestUnit(delta);
  const displayValue = Math.round(delta / getUnitMs(unit));

  return (
    <div className={cx("text-xs", { "text-red-600": displayValue <= 0 })}>
      <FaClock className="inline" />

      <span className="align-middle">
        {" "}
        {displayValue === 0 ? (
          <span>Due now</span>
        ) : displayValue > 0 ? (
          <span>
            Due in {displayValue} {unit}
            {displayValue !== 1 && "s"}
          </span>
        ) : (
          <span>
            Due {-displayValue} {unit}
            {-displayValue !== 1 && "s"} ago
          </span>
        )}
      </span>
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
