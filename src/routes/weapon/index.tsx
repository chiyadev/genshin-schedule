import { h } from "preact";
import { useMemo } from "preact/hooks";
import { useConfig } from "../../configs";
import { Weapon, Weapons } from "../../db/weapons";
import { WeaponMaterial } from "../../db/weaponMaterials";
import DropLabel from "../../dropLabel";
import Checkbox from "../../checkbox";
import { arrayToggle, useTabTitle } from "../../utils";
import WhiteCard from "../../whiteCard";
import { memo } from "preact/compat";

const WeaponInfo = ({ weapon }: { weapon: string }) => {
  const info = useMemo(() => Weapons.find(c => c.name === weapon), [weapon]);

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
          <img
            alt={weapon.name}
            src={`/assets/game/${weapon.name}.png`}
            className="w-16 h-16 object-cover"
          />

          <div className="flex flex-col justify-center">
            <div className="text-xl font-bold">{weapon.name}</div>
            <div className="text-xs text-gray-600">{weapon.type}</div>
          </div>
        </div>
      </a>

      <div className="py-4 flex flex-col space-y-4">
        <WeaponMat material={weapon.material} />
      </div>

      <div className="py-4 text-sm">
        <Toggle weapon={weapon} />
      </div>
    </WhiteCard>
  );
};

const WeaponMat = ({ material }: { material: WeaponMaterial }) => {
  return (
    <div className="space-y-2">
      <a href={material.wiki}>
        <div className="space-x-2 flex flex-row">
          <img
            alt={material.name}
            src={`/assets/game/${material.item}.png`}
            className="w-12 h-12"
          />
          <div className="flex flex-col justify-center">
            <div className="text-lg">{material.name}</div>
            <div className="text-xs text-gray-600">{material.type}</div>
          </div>
        </div>
      </a>

      <div className="pl-12 mx-2 text-sm">
        <DropLabel item={material} />
      </div>
    </div>
  );
};

const Toggle = ({ weapon }: { weapon: Weapon }) => {
  const [list, setList] = useConfig("weapons");
  const exists = useMemo(() => list.includes(weapon.name), [list, weapon]);

  return (
    <Checkbox
      value={exists}
      setValue={value => {
        setList(list => arrayToggle(list, weapon.name, value));
      }}
    >
      <div className="inline-block align-middle ml-2">
        <div>Show on schedule</div>

        <div className="text-xs text-gray-600">
          Scheduled domains will appear on the days they are available.
        </div>
      </div>
    </Checkbox>
  );
};

export default memo(WeaponInfo);
