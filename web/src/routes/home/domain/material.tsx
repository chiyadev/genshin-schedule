import React, { memo } from "react";
import { TalentMaterial } from "../../../db/talentMaterials";
import { WeaponMaterial } from "../../../db/weaponMaterials";
import { Character } from "../../../db/characters";
import { Weapon } from "../../../db/weapons";
import { cx } from "emotion";
import NoteText from "./note";
import { Link } from "react-router-dom";

const MaterialDisplay = ({
  material,
  items,
  path,
  roundItems,
}: {
  material: TalentMaterial | WeaponMaterial;
  items: (Character | Weapon)[];
  path: "characters" | "weapons";
  roundItems?: boolean;
}) => {
  return (
    <div className="py-4 space-y-4">
      <a href={material.wiki}>
        <div className="space-x-2 flex flex-row">
          <img
            alt={material.item}
            src={`/assets/game/${material.item}.png`}
            className="w-10 h-10"
          />
          <div className="flex flex-col justify-center">
            <div className="text-lg">{material.name}</div>
            <div className="text-xs text-gray-600">{material.type}</div>
          </div>
        </div>
      </a>

      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.name}
            className="pl-4 flex flex-row space-x-2"
            to={`/${path}/${item.name}`}
          >
            <img
              alt={item.name}
              src={`/assets/game/${item.name}.png`}
              className={cx("w-6 h-6 object-cover", {
                "rounded-full": roundItems,
              })}
            />

            <div className="flex flex-col justify-center text-sm">
              <div>
                {item.name}
                <NoteText name={item.name} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(MaterialDisplay);
