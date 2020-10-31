import React, { memo } from "react";
import LazyLoad from "react-lazyload";
import GameImage from "../../../gameImage";

const Item = ({ name, onClick }: { name: string; onClick?: () => void }) => {
  return (
    <div className="inline-block">
      <LazyLoad overflow>
        <GameImage
          name={name}
          className="w-8 h-8 object-contain cursor-pointer pointer-events-auto"
          onClick={onClick}
        />
      </LazyLoad>
    </div>
  );
};

export default memo(Item);
