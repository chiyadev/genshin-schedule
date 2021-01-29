import { data } from "./RegionLabelLayer.json";
import React, { memo, useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { Feature, Point } from "geojson";
import { DivIcon, LatLng, LatLngTuple, Layer, Marker } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { chakra } from "@chakra-ui/react";
import { Configs, MapZoomMax, useConfig } from "../../utils/configs";

const RegionLabelLayer = () => {
  const [renderId, setRenderId] = useState(0);
  const [state] = useConfig("mapState");

  useEffect(() => setRenderId((i) => i + 1), [state]);

  return <GeoJSON key={renderId} data={data as any} pointToLayer={(...props) => pointToLayer(...props, state)} />;
};

const pointToLayer = (geoJsonPoint: Feature<Point, any>, latlng: LatLng, map: Configs["mapState"]): Layer => {
  const markerLatlng: LatLngTuple = [latlng.lng, latlng.lat]; // careful!! latlng swapped

  return new Marker(markerLatlng, {
    interactive: false,
    icon: new DivIcon({
      html: renderToStaticMarkup(<RegionLabel geoJsonPoint={geoJsonPoint} map={map} />),
      className: "region-label-icon",
    }),
    zIndexOffset: -900,
  });
};

const RegionLabel = ({ geoJsonPoint, map }: { geoJsonPoint: Feature<Point, any>; map: Configs["mapState"] }) => {
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
      {geoJsonPoint.properties.label?.en}
    </chakra.div>
  );
};

export default memo(RegionLabelLayer);
