import React, { memo, useMemo } from "react";
import { Character, Characters } from "../../db/characters";
import { useTabTitle } from "../../utils";
import WhiteCard from "../../whiteCard";
import MaterialDisplay from "./material";
import CommonMaterialDisplay from "./common";
import GameImage from "../../gameImage";
import Toggle from "./toggle";

const CharacterInfo = ({ character }: { character: string }) => {
  const info = useMemo(() => Characters.find((c) => c.name === character), [
    character,
  ]);

  useTabTitle(info?.name);

  return (
    <div className="container mx-auto p-4">
      {info ? <Inner character={info} /> : <div>No such character.</div>}
    </div>
  );
};

const Inner = ({ character }: { character: Character }) => {
  return (
    <WhiteCard divide>
      <a href={character.wiki}>
        <div className="space-x-2 py-4 flex flex-row">
          <GameImage name={character.name} className="w-16 h-16 rounded-full" />

          <div className="flex flex-col justify-center">
            <div className="text-xl font-bold">{character.name}</div>
            <div className="text-xs text-gray-600">{character.type}</div>
          </div>
        </div>
      </a>

      {character.talentMaterials.map((material) => (
        <MaterialDisplay
          character={character}
          material={material}
          showToggle={character.talentMaterials.length === 1}
        />
      ))}

      {character.commonMaterials.map((material) => (
        <CommonMaterialDisplay character={character} material={material} />
      ))}

      {character.talentMaterials.length !== 1 && (
        <div className="py-4 text-sm">
          <Toggle character={character} />
        </div>
      )}
    </WhiteCard>
  );
};

export default memo(CharacterInfo);
