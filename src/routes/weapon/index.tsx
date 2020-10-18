import { h } from "preact";
import { useMemo } from "preact/hooks";
import { useConfig } from "../../configs";
import { Weapon, Weapons } from "../../db/weapons";
import { WeaponMaterial } from "../../db/weaponMaterials";
import DropLabel from "../../dropLabel";
import Checkbox from "../../checkbox";

const WeaponInfo = ({ weapon }: { weapon: string }) => {
  const info = useMemo(() => Weapons.find(c => c.name === weapon), [weapon]);

  return (
    <div className="container mx-auto p-4">
      {info ? <Inner weapon={info} /> : <div>No such weapon.</div>}
    </div>
  );
};

const Inner = ({ weapon }: { weapon: Weapon }) => {
  return (
    <div className="bg-white text-black rounded px-4 flex flex-col divide-y divide-gray-300 shadow-lg">
      <a href={weapon.wiki}>
        <div className="space-x-2 py-4 flex flex-row">
          <img
            className="w-16 h-16 object-cover"
            src={`/assets/weapons/${weapon.name}.png`}
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
    </div>
  );
};

const WeaponMat = ({ material }: { material: WeaponMaterial }) => {
  return (
    <div className="space-y-2">
      <a href={material.wiki}>
        <div className="space-x-2 flex flex-row">
          <img
            src={`/assets/weapons/${material.name}.png`}
            className="w-12 h-12"
          />
          <div className="flex flex-col justify-center">
            <div className="text-lg">{material.name}</div>
            <div className="text-xs text-gray-600">{material.type}</div>
          </div>
        </div>
      </a>

      <DropLabel item={material} />
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
        if (value) {
          setList(
            [...list, weapon.name].filter((v, i, a) => a.indexOf(v) === i)
          );
        } else {
          setList(list.filter(c => c !== weapon.name));
        }
      }}
    >
      Show on schedule
    </Checkbox>
  );
};

export default WeaponInfo;
