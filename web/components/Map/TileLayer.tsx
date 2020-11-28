import React, { memo } from "react";
import { TileLayer as TileLayerCore } from "react-leaflet";

const TileLayer = () => {
  return (
    <TileLayerCore
      url="https://s.chiya.dev/genshin/map/{z}/ppp{x}_{y}.jpg"
      attribution='<a href="https://bbs.mihoyo.com/ys/article/1328298" target="_blank" rel="noreferrer noopener">yuanshen.site</a>'
    />
  );
};

export default memo(TileLayer);
