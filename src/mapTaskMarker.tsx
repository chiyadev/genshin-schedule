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
        iconSize: [36, 36]
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
        {useMemo(
          () =>
            page === "Info" ? (
              <InfoPage
                task={task}
                setTask={setTask}
                setPage={setPage}
                autoFocus={alwaysOpen}
                showDue={showDue}
              />
            ) : page === "Icon" ? (
              <IconPage setTask={setTask} setPage={setPage} />
            ) : null,
          [alwaysOpen, page, setTask, showDue, task]
        )}

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
      <div className="flex flex-row space-x-2">
        <img
          alt={task.icon}
          src={`/assets/game/${task.icon}.png`}
          className="w-6 h-6 object-contain pointer-events-auto cursor-pointer"
          onClick={() => setPage("Icon")}
        />

        <input
          ref={nameRef}
          value={task.name}
          onInput={({ currentTarget: { value } }) => {
            setTask(task => ({ ...task, name: value }));
          }}
          className="font-bold flex-1"
          placeholder={task.icon}
        />
      </div>

      <textarea
        value={task.description || ""}
        onInput={({ currentTarget: { value } }) => {
          setTask(task => ({ ...task, description: value }));
        }}
        className="text-sm text-gray-600 resize-none h-12"
        placeholder="Task description"
      />

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
  const unit = getLargestUnit(Math.abs(delta));
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

const iconDb = new MemorySearch<string>();
const icons = [
  "Iron Chunk",
  "White Iron Chunk",
  "Crystal Chunk",
  "Electro Crystal",
  "Cor Lapis",
  "Noctilucous Jade",
  "Resin",

  // character exp materials
  "Wanderer's Advice",
  "Adventurer's Experience",
  "Hero's Wit",

  // weapon enhancement materials
  "Enhancement Ore",
  "Fine Enhancement Ore",
  "Mystic Enhancement Ore",

  // character ascension materials
  "Brilliant Diamond Sliver",
  "Vayuda Turquoise Sliver",
  "Shivada Jade Sliver",
  "Vajrada Amethyst Sliver",
  "Prithiva Topaz Sliver",
  "Varunada Lazurite Sliver",
  "Agnidus Agate Sliver",

  // common ascension materials
  "Slime Condensate",
  "Damaged Mask",
  "Firm Arrowhead",
  "Divining Scroll",
  "Heavy Horn",
  "Dead Ley Line Branch",
  "Chaos Device",
  "Mist Grass Pollen",
  "Hunter's Sacrificial Knife",
  "Recruit's Insignia",
  "Treasure Hoarder Insignia",
  "Fragile Bone Shard",
  "Whopperflower Nectar",

  // local specialties
  "Calla Lily",
  "Cecilia",
  "Dandelion Seed",
  "Philanemo Mushroom",
  "Small Lamp Grass",
  "Valberry",

  "Windwheel Aster",
  "Wolfhook",
  "Glaze Lily",
  "Jueyun Chili",
  "Qingxin",
  "Silk Flower",
  "Starconch",
  "Violetgrass",

  // cooking ingredients
  "Lotus Head",
  "Raw Meat",
  "Matsutake",
  "Crab",
  "Fowl",
  "Wheat",
  "Almond",
  "Shrimp Meat"
];

for (const icon of icons) {
  iconDb.add(icon, icon);
}

const knownTimers: { [key: string]: number | undefined } = {
  "Iron Chunk": 24,
  "White Iron Chunk": 48,
  "Crystal Chunk": 72,
  "Electro Crystal": 48,
  "Cor Lapis": 72,
  "Noctilucous Jade": 48,

  "Calla Lily": 48,
  Cecilia: 48,
  "Dandelion Seed": 48,
  "Philanemo Mushroom": 48,
  "Small Lamp Grass": 48,
  Valberry: 48,
  "Windwheel Aster": 48,
  Wolfhook: 48,
  "Glaze Lily": 48,
  "Jueyun Chili": 48,
  Qingxin: 48,
  "Silk Flower": 48,
  Starconch: 48,
  Violetgrass: 48
};

const IconPage = ({
  setTask,
  setPage
}: {
  setTask: StateUpdater<Task>;
  setPage: StateUpdater<Page>;
}) => {
  const [search, setSearch] = useConfig("iconQuery");
  const results = useMemo(() => {
    const set = new Set(iconDb.search(search));

    // preserve display order
    return icons.filter(icon => set.has(icon));
  }, [search]);

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
                  const timer = knownTimers[icon];

                  setTask(task => ({
                    ...task,
                    name: icon,
                    icon,
                    refreshTime: timer ? timer * 3600000 : task.refreshTime
                  }));
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
