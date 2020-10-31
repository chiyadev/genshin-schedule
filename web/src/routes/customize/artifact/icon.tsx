import React, { memo, useMemo } from "react";
import { Artifact } from "../../../db/artifacts";
import { useConfig } from "../../../configs";
import { cx } from "emotion";
import LazyLoad from "react-lazyload";
import GameImage from "../../../gameImage";

const Icon = ({ artifact }: { artifact: Artifact }) => {
  const [existing] = useConfig("artifacts");

  const alreadyAdded = useMemo(() => existing.includes(artifact.name), [
    existing,
    artifact.name,
  ]);

  return (
    <div
      className={cx(
        "inline-block m-1 text-center bg-white text-black rounded shadow-lg w-32",
        { "opacity-50": alreadyAdded }
      )}
    >
      <LazyLoad height="5rem">
        <GameImage
          name={artifact.name}
          className="w-20 h-20 mx-auto mt-2 object-fit"
        />
      </LazyLoad>

      <div className="text-center text-sm p-2 truncate">{artifact.name}</div>
    </div>
  );
};

export default memo(Icon);
