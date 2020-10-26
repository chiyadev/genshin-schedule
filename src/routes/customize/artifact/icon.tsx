import { Artifact } from "../../../db/artifacts";
import { useConfig } from "../../../configs";
import { useMemo } from "preact/hooks";
import { cx } from "emotion";
import LazyLoad from "react-lazyload";
import { h } from "preact";
import { memo } from "preact/compat";

const Icon = ({ artifact }: { artifact: Artifact }) => {
  const [existing] = useConfig("artifacts");

  const alreadyAdded = useMemo(() => existing.includes(artifact.name), [
    existing,
    artifact.name
  ]);

  return (
    <div
      className={cx(
        "inline-block m-1 text-center bg-white text-black rounded shadow-lg w-32",
        { "opacity-50": alreadyAdded }
      )}
    >
      <LazyLoad height="5rem">
        <img
          alt={artifact.name}
          src={`/assets/game/${artifact.name}.png`}
          className="w-20 h-20 mx-auto mt-2 object-fit"
        />
      </LazyLoad>

      <div className="text-center text-sm p-2 truncate">{artifact.name}</div>
    </div>
  );
};

export default memo(Icon);
