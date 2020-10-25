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
import { CommonMaterial } from "../../db/commonMaterials";
import { randomStr } from "../../random";
import { route } from "preact-router";
import { FaPlus } from "react-icons/fa";

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

      <WeaponMat weapon={weapon} material={weapon.material} />

      {weapon.commonMaterials.map(material => (
        <CommonMat key={material.name} weapon={weapon} material={material} />
      ))}
    </WhiteCard>
  );
};

const WeaponMat = ({
  weapon,
  material
}: {
  weapon: Weapon;
  material: WeaponMaterial;
}) => {
  const [list, setList] = useConfig("weapons");
  const exists = useMemo(() => list.includes(weapon.name), [list, weapon]);

  return (
    <div className="py-4 space-y-4 text-sm flex flex-col">
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

      <DropLabel item={material} />

      <Checkbox
        value={exists}
        setValue={value => {
          setList(list => arrayToggle(list, weapon.name, value));
        }}
      >
        <div>Show on schedule</div>

        <div className="text-xs text-gray-600">
          Scheduled domains will appear on the days they are available.
        </div>
      </Checkbox>
    </div>
  );
};

const CommonMat = ({
  weapon,
  material
}: {
  weapon: Weapon;
  material: CommonMaterial;
}) => {
  const [center] = useConfig("mapState");
  const [, setTask] = useConfig("mapCreateTask");

  return (
    <div className="py-4 space-y-4">
      <a href={material.wiki}>
        <div className="space-x-2 flex flex-row">
          <img
            alt={material.name}
            src={`/assets/game/${material.item}.png`}
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col justify-center">
            <div className="text-lg">{material.name}</div>
            <div className="text-xs text-gray-600">{material.type}</div>
          </div>
        </div>
      </a>

      <div className="text-sm">
        <span
          className="cursor-pointer"
          onClick={() => {
            setTask(task => ({
              ...task,
              id: randomStr(6),
              location: center,
              name: material.name,
              icon: material.item,
              description: `ascension material for ${weapon.name}`,
              visible: true
            }));

            route("/map");
          }}
        >
          <FaPlus className="inline" />

          <span className="align-middle"> Add as task</span>
        </span>
      </div>
    </div>
  );
};

export default memo(WeaponInfo);
