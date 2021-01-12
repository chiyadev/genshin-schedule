import React, { memo } from "react";
import { TileLayer as TileLayerCore } from "react-leaflet";
import { supportsWebP } from "../../utils/dom";

const TileLayer = () => {
  const ext = supportsWebP() ? "webp" : "png";

  return (
    <TileLayerCore
      url={`https://s.chiya.dev/genshin/map2/Map_{z}_{x}_{y}.${ext}`}
      attribution='<a href="https://github.com/GenshinMap/genshinmap.github.io" target="_blank" rel="noreferrer noopener">genshinmap.github.io</a>'
    />
  );
};

export default memo(TileLayer);
