import { Link } from "preact-router";
import { h } from "preact";
import { useMemo } from "preact/hooks";
import { Regions } from "../../db/regions";
import { cx } from "emotion";
import { Weapon, Weapons } from "../../db/weapons";
import LazyLoad from "react-lazyload";
import { useConfig } from "../../configs";
import { MemorySearch } from "../../memorySearch";
import { MultiMap } from "../../multiMap";

const db = new MemorySearch<Weapon>();
const materialToWeapons = new MultiMap<string, Weapon>();

for (const weapon of Weapons) {
  db.add(weapon.type, weapon);
  db.add(weapon.name, weapon);
  db.add(weapon.material.name, weapon);

  materialToWeapons.add(weapon.material.name, weapon);
}

for (const region of Regions) {
  for (const domain of region.domains) {
    for (const drops of domain.drops) {
      for (const item of drops.items) {
        for (const weapon of materialToWeapons.get(item.name)) {
          db.add(region.name, weapon);
          db.add(domain.name, weapon);

          drops.name && db.add(drops.name, weapon);
          drops.days.forEach(day => db.add(day, weapon));
        }
      }
    }
  }
}

const WeaponList = ({ search }: { search: string }) => {
  const results = useMemo(
    () => db.search(search).sort((a, b) => a.name.localeCompare(b.name)),
    [search]
  );

  if (results.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="text-xl font-bold mb-2">
        <img
          src="/assets/weapons/Aquila Favonia.png"
          className="w-8 h-8 inline object-cover"
        />

        <span className="align-middle"> Weapons</span>
      </div>

      {results.map(weapon => (
        <Link key={weapon.name} href={`/weapons/${weapon.name}`}>
          <WeaponIcon weapon={weapon} />
        </Link>
      ))}
    </div>
  );
};

const WeaponIcon = ({ weapon }: { weapon: Weapon }) => {
  const [existing] = useConfig("weapons");

  const alreadyAdded = useMemo(() => existing.includes(weapon.name), [
    existing,
    weapon.name
  ]);

  return (
    <div
      className={cx(
        "inline-block m-1 text-center bg-white text-black rounded shadow-lg w-32",
        { "opacity-50": alreadyAdded }
      )}
    >
      <LazyLoad>
        <img
          className="w-20 h-20 mx-auto mt-2 object-cover"
          src={`/assets/weapons/${weapon.name}.png`}
        />
      </LazyLoad>

      <div className="text-center p-2 truncate">
        <div className="text-sm truncate">{weapon.name}</div>

        <div className="text-xs text-gray-600 truncate">
          <img
            src={`/assets/weapons/${weapon.material.name}.png`}
            className="w-3 h-3 inline opacity-75"
          />

          <span className="align-middle"> {weapon.material.name}</span>
        </div>
      </div>
    </div>
  );
};

export default WeaponList;
