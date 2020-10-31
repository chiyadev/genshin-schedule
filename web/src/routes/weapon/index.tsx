import React, { memo, useMemo } from "react";
import { Weapon, Weapons } from "../../db/weapons";
import { useTabTitle } from "../../utils";
import WhiteCard from "../../whiteCard";
import MaterialDisplay from "./material";
import CommonMaterialDisplay from "./common";
import Note from "./note";
import GameImage from "../../gameImage";

const WeaponInfo = ({ weapon }: { weapon: string }) => {
  const info = useMemo(() => Weapons.find((c) => c.name === weapon), [weapon]);

  useTabTitle(info?.name);

  return (
    <div className="container mx-auto p-4">
      {info ? <Inner weapon={info} /> : <div>No such weapon.</div>}
    </div>
  );
};

const Inner = ({ weapon }: { weapon: Weapon }) => {
  return (
    <WhiteCard divide>
      <a href={weapon.wiki}>
        <div className="space-x-2 py-4 flex flex-row">
          <GameImage name={weapon.name} className="w-16 h-16 object-cover" />

          <div className="flex flex-col justify-center">
            <div className="text-xl font-bold">{weapon.name}</div>
            <div className="text-xs text-gray-600">{weapon.type}</div>
          </div>
        </div>
      </a>

      <MaterialDisplay weapon={weapon} material={weapon.material} />

      {weapon.commonMaterials.map((material) => (
        <CommonMaterialDisplay
          key={material.name}
          weapon={weapon}
          material={material}
        />
      ))}

      <Note weapon={weapon} />
    </WhiteCard>
  );
};

export default memo(WeaponInfo);
