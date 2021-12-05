import React, { memo, ReactNode, useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { DivIcon, LatLng, LatLngTuple, Layer, Marker } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { chakra } from "@chakra-ui/react";
import { Config, MapZoomMax, useConfig } from "../../utils/config";
import { useIntl } from "react-intl";
import { GeoMarkers } from "../../db/map";

const RegionLabelLayer = () => {
  const { formatMessage: formatMessageId } = useIntl();
  const [renderId, setRenderId] = useState(0);
  const [state] = useConfig("mapState");

  useEffect(() => setRenderId((i) => i + 1), [state]);

  return (
    <GeoJSON
      key={renderId}
      data={GeoMarkers as any}
      pointToLayer={({ id }, latlng) => pointToLayer(state, formatMessageId({ id: id?.toString() }), latlng)}
    />
  );
};

const pointToLayer = (map: Config["mapState"], name: string, latlng: LatLng): Layer => {
  const markerLatlng: LatLngTuple = [latlng.lng, latlng.lat]; // careful!! latlng swapped

  return new Marker(markerLatlng, {
    interactive: false,
    icon: new DivIcon({
      html: renderToStaticMarkup(<RegionLabel map={map} name={name} />),
      className: "region-label-icon",
    }),
    zIndexOffset: -900,
  });
};

const RegionLabel = ({ map, name }: { map: Config["mapState"]; name: ReactNode }) => {
  return (
    <chakra.div
      whiteSpace="nowrap"
      color="white"
      position="relative"
      top="-50%"
      left="-50%"
      fontSize="1rem"
      fontFamily="Genshin"
      style={{ transform: `scale(${map.zoom / MapZoomMax})` }}
    >
      {name}
    </chakra.div>
  );
};

export default memo(RegionLabelLayer);
