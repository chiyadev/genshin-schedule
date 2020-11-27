import React, { CSSProperties, memo, ReactNode } from "react";
import { useConfig } from "../../utils/configs";
import TileLayer from "./TileLayer";
import TaskLayer from "./TaskLayer";
import TaskCreateLayer from "./TaskCreateLayer";
import PositionSync from "./PositionSync";
import { MapContainer } from "react-leaflet";

const Map = ({ children, minimal, style }: { children?: ReactNode; minimal?: boolean; style?: CSSProperties }) => {
  const [{ lat, lng, zoom }] = useConfig("mapState");

  // adapted from https://github.com/GenshinMap/genshinmap.github.io/blob/master/js/index.js
  return (
    <MapContainer
      className="task-map"
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
      style={style}
    >
      <TileLayer />
      <TaskLayer />
      <TaskCreateLayer />
      <PositionSync />

      {children}
    </MapContainer>
  );
};

export default memo(Map);
