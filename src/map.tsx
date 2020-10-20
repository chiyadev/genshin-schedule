import { ComponentChildren, h } from "preact";
import { Map as Leaflet, TileLayer, useLeaflet } from "react-leaflet";
import { Task, useConfig } from "./configs";
import { StateUpdater, useMemo } from "preact/hooks";
import MapTaskMarker from "./mapTaskMarker";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { randomStr } from "./random";
import { memo } from "preact/compat";
import { useServerDate } from "./time";

import "leaflet/dist/leaflet.css";
import "./map.css";

const Map = ({
  className,
  children,
  minimal
}: {
  className?: string;
  children?: ComponentChildren;
  minimal?: boolean;
}) => {
  const [{ lat, lng, zoom }, setState] = useConfig("mapState");
  const [, setCreateTask] = useConfig("mapCreateTask");

  // adapted from https://github.com/GenshinMap/genshinmap.github.io/blob/master/js/index.js
  return (
    <Leaflet
      center={[lat, lng]}
      zoomDelta={0}
      zoomSnap={0.1}
      maxZoom={8}
      minZoom={4}
      zoom={zoom}
      maxBounds={[
        [0, 0],
        [-66.5, 90]
      ]}
      attributionControl={!minimal}
      zoomControl={!minimal}
      className={className}
      onclick={({ latlng: location }) =>
        setCreateTask(task => ({
          ...task,
          id: randomStr(6),
          location,
          visible: true
        }))
      }
      onmoveend={({ target }) => {
        setState({
          ...target.getCenter(),
          zoom: Math.round(target.getZoom() * 100) / 100
        });
      }}
    >
      <TileLayer
        url="https://s.chiya.dev/genshin/map/{z}/ppp{x}_{y}.jpg"
        attribution='<a href="https://bbs.mihoyo.com/ys/article/1328298" target="_blank" rel="noreferrer noopener">yuanshen.site</a>'
      />

      <TaskLayer />
      <TaskCreateLayer />

      {children}
    </Leaflet>
  );
};

const TaskLayer = () => {
  const [tasks, setTasks] = useConfig("tasks");

  const taskSetters: StateUpdater<Task>[] = useMemo(() => {
    return tasks.map(task => {
      return newTask => {
        setTasks(tasks =>
          tasks.map(oldTask => {
            if (oldTask.id === task.id) {
              if (typeof newTask === "function") {
                return newTask(oldTask);
              } else {
                return newTask;
              }
            } else {
              return oldTask;
            }
          })
        );
      };
    });
  }, [tasks, setTasks]);

  return (
    <div>
      {useMemo(
        () =>
          tasks.map((task, i) => (
            <MapTaskMarker
              key={task.id}
              task={task}
              setTask={taskSetters[i]}
              footer={
                <div className="flex flex-row w-full space-x-2">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setTasks(tasks => tasks.filter(t => t.id !== task.id));
                    }}
                  >
                    <FaTrash className="inline" />
                    <span className="align-middle"> Delete</span>
                  </div>

                  <div className="flex-1" />
                  <TaskDoneButton task={task} setTask={taskSetters[i]} />
                </div>
              }
            />
          )),
        [setTasks, taskSetters, tasks]
      )}
    </div>
  );
};

const TaskDoneButton = ({
  task,
  setTask
}: {
  task: Task;
  setTask: StateUpdater<Task>;
}) => {
  const date = useServerDate(1000);
  const leaflet = useLeaflet();

  if (task.dueTime <= date.getTime()) {
    return (
      <div
        className="cursor-pointer text-green-600"
        onClick={() => {
          setTask(task => ({
            ...task,
            dueTime: date.getTime() + task.refreshTime
          }));

          leaflet.map?.closePopup();
        }}
      >
        <FaCheck className="inline" />
        <span className="align-middle"> Mark as done</span>
      </div>
    );
  } else {
    return (
      <div
        className="cursor-pointer text-red-600"
        onClick={() => {
          setTask(task => ({
            ...task,
            dueTime: date.getTime()
          }));

          leaflet.map?.closePopup();
        }}
      >
        <FaTimes className="inline" />
        <span className="align-middle"> Mark as to-do</span>
      </div>
    );
  }
};

const TaskCreateLayer = () => {
  const [task, setTask] = useConfig("mapCreateTask");

  if (!task.visible) {
    return null;
  }

  return (
    <MapTaskMarker
      task={task}
      setTask={newTask => {
        setTask(oldTask => {
          if (typeof newTask === "function") {
            newTask = newTask(oldTask);
          }

          return { ...oldTask, ...newTask };
        });
      }}
      alwaysOpen
      showDue={false}
      onClose={() => setTask(task => ({ ...task, visible: false }))}
      footer={<TaskCreateButton />}
    />
  );
};

const TaskCreateButton = () => {
  const [task, setTask] = useConfig("mapCreateTask");
  const [, setTasks] = useConfig("tasks");
  const [, setFocusedTask] = useConfig("mapFocusedTask");

  const date = useServerDate(1000);

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        setTask(task => ({ ...task, visible: false }));
        setTasks(tasks => [...tasks, { ...task, dueTime: date.getTime() }]);
        setFocusedTask(false);
      }}
    >
      <FaCheck className="inline" />
      <span className="align-middle"> Create</span>
    </div>
  );
};

export default memo(Map);
