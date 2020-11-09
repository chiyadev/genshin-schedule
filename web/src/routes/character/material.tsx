import React, { memo } from "react";
import { Character } from "../../db/characters";
import { TalentMaterial } from "../../db/talentMaterials";
import DropLabel from "../../dropLabel";
import GameImage from "../../gameImage";
import Toggle from "./toggle";

const MaterialDisplay = ({
  character,
  material,
  showToggle,
}: {
  character: Character;
  material: TalentMaterial;
  showToggle?: boolean;
}) => {
  return (
    <div className="py-4 space-y-4 text-sm flex flex-col">
      <a href={material.wiki}>
        <div className="space-x-2 flex flex-row">
          <GameImage name={material.item} className="w-12 h-12" />

          <div className="flex flex-col justify-center">
            <div className="text-lg">{material.name}</div>
            <div className="text-xs text-gray-600">{material.type}</div>
          </div>
        </div>
      </a>

      <DropLabel item={material} />

      {showToggle && <Toggle character={character} />}
    </div>
  );
};

export default memo(MaterialDisplay);
