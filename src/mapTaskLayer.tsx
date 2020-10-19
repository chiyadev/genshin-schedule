import { h } from "preact";
import { Marker, Popup, Tooltip } from "react-leaflet";

const MapTaskLayer = () => {
  return (
    <Marker position={[-10, 10]}>
      <Popup>Popup for Marker</Popup>
      <Tooltip>Tooltip for Marker</Tooltip>
    </Marker>
  );
};

export default MapTaskLayer;
