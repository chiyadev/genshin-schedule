import React, { memo, useMemo } from "react";
import { Character, Characters } from "../../db/characters";
import { useTabTitle } from "../../utils";
import WhiteCard from "../../whiteCard";
import MaterialDisplay from "./material";
import CommonMaterialDisplay from "./common";
import GameImage from "../../gameImage";

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

      <MaterialDisplay
        character={character}
        material={character.talentMaterial}
      />

      <CommonMaterialDisplay
        character={character}
        material={character.commonMaterial}
      />
    </WhiteCard>
  );
};

export default memo(CharacterInfo);
