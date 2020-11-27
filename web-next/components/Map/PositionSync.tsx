import { memo, useRef } from "react";
import { useMapEvent } from "react-leaflet";
import { useConfig } from "../../utils/configs";

const PositionSync = () => {
  const [, setState] = useConfig("mapState");
  const timeout = useRef<number>();

  useMapEvent("move", () => {
    clearTimeout(timeout.current);
  });

  useMapEvent("moveend", ({ target }) => {
    timeout.current = window.setTimeout(() => {
      setState({
        ...target.getCenter(),
        zoom: Math.round(target.getZoom() * 100) / 100,
      });
    }, 100);
  });

  return null;
};

export default memo(PositionSync);
