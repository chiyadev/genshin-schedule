import React, { memo, useMemo } from "react";
import { Character } from "../../../db/characters";
import { useConfig } from "../../../configs";
import { cx } from "emotion";
import LazyLoad from "react-lazyload";

const Icon = ({ character }: { character: Character }) => {
  const [existing] = useConfig("characters");

  const alreadyAdded = useMemo(() => existing.includes(character.name), [
    existing,
    character.name,
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
          alt={character.name}
          className="w-20 h-20 mx-auto mt-2 rounded-full"
          src={`/assets/game/${character.name}.png`}
        />
      </LazyLoad>

      <div className="text-center p-2">
        <div className="text-sm">{character.name}</div>

        <div className="text-xs text-gray-600">
          <img
            alt={character.talentMaterial.name}
            src={`/assets/game/${character.talentMaterial.item}.png`}
            className="w-3 h-3 inline opacity-75"
          />

          <span className="align-middle"> {character.talentMaterial.name}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Icon);
