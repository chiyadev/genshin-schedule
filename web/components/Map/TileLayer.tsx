import React, { memo } from "react";
import { TileLayer as TileLayerCore } from "react-leaflet";
import { supportsWebP } from "../../utils/dom";

const TileLayer = () => {
  const ext = supportsWebP() ? "webp" : "png";

  return (
    <TileLayerCore
      url={`https://static.chiya.dev/genshin/map2/Map_{z}_{x}_{y}.${ext}`}
      attribution='<a href="https://github.com/Teyvat-moe/Teyvat.moe" target="_blank" rel="noreferrer noopener">teyvat.moe</a>'
    />
  );
};

export default memo(TileLayer);
