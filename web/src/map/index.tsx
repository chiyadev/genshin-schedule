import React, { memo, ReactNode, useRef } from "react";
import { Map as Leaflet } from "react-leaflet";
import { useConfig } from "../configs";
import { randomStr } from "../random";
import TileLayer from "./tiles";
import TaskLayer from "./tasks";
import TaskCreateLayer from "./taskCreate";

import "leaflet/dist/leaflet.css";
import "./index.css";

const Map = ({
  className,
  children,
  minimal,
}: {
  className?: string;
  children?: ReactNode;
  minimal?: boolean;
}) => {
  const [{ lat, lng, zoom }, setState] = useConfig("mapState");
  const [, setCreateTask] = useConfig("mapCreateTask");

  const syncRef = useRef<number>();

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
        [-66.5, 90],
      ]}
      attributionControl={!minimal}
      zoomControl={false}
      className={className}
      onclick={({ latlng: location }) =>
        setCreateTask((task) => ({
          ...task,
          id: randomStr(6),
          location,
          visible: true,
        }))
      }
      onmove={() => clearTimeout(syncRef.current)}
      onmoveend={({ target }) => {
        syncRef.current = window.setTimeout(() => {
          setState({
            ...target.getCenter(),
            zoom: Math.round(target.getZoom() * 100) / 100,
          });
        }, 100);
      }}
    >
      <TileLayer />
      <TaskLayer />
      <TaskCreateLayer />

      {children}
    </Leaflet>
  );
};

export default memo(Map);
