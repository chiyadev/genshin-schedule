import { memo, useEffect, useRef } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { useConfig } from "../../utils/configs";

const PositionSync = () => {
  const map = useMap();
  const timeout = useRef<number>();
  const managed = useRef(true);
  const [state, setState] = useConfig("mapState");

  useEffect(() => {
    if (!managed.current) {
      map.setView(state, state.zoom);
    }

    managed.current = false;
  }, [state]);

  useMapEvent("move", () => {
    clearTimeout(timeout.current);
  });

  useMapEvent("moveend", ({ target }) => {
    timeout.current = window.setTimeout(() => {
      setState({
        ...target.getCenter(),
        zoom: Math.round(target.getZoom() * 100) / 100,
      });

      managed.current = true;
    }, 100);
  });

  return null;
};

export default memo(PositionSync);
