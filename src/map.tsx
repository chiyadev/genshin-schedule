import { ComponentChildren, h } from "preact";
import { Map as Leaflet, TileLayer } from "react-leaflet";
import { css, cx } from "emotion";
import { useConfig } from "./configs";
import { useRef } from "preact/hooks";
import MapTaskMarker from "./mapTaskMarker";
import { FaCheck } from "react-icons/fa";

import "leaflet/dist/leaflet.css";
import { randomStr } from "./random";

const Map = ({
  className,
  children,
  minimal
}: {
  className?: string;
  children?: ComponentChildren;
  minimal?: boolean;
}) => {
  const [state, setState] = useConfig("mapState");
  const [, setCreateTask] = useConfig("mapCreateTask");

  // after reading initial state, only update it
  const { lat, lng, zoom } = useRef(state).current;

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
      className={cx(
        className,
        // https://github.com/Leaflet/Leaflet/issues/3575#issuecomment-688644225
        css`
          .leaflet-tile-container img {
            width: 256.5px !important;
            height: 256.5px !important;
          }
        `
      )}
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

      <TaskCreateLayer />

      {children}
    </Leaflet>
  );
};

const TaskCreateLayer = () => {
  const [task, setTask] = useConfig("mapCreateTask");
  const [, setTasks] = useConfig("tasks");

  if (!task.visible) {
    return null;
  }

  return (
    <MapTaskMarker
      task={task}
      setTask={task => {
        setTask(t => {
          if (typeof task === "function") {
            task = task(t);
          }

          return { ...t, ...task };
        });
      }}
      onClose={() => setTask(task => ({ ...task, visible: false }))}
      menu={
        <div
          className="cursor-pointer"
          onClick={() => {
            setTask(task => ({ ...task, visible: false }));
            setTasks(tasks => [...tasks, task]);
          }}
        >
          <FaCheck className="inline" />
          <span className="align-middle"> Create</span>
        </div>
      }
    />
  );
};

export default Map;
