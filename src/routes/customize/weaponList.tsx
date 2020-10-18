import { Link } from "preact-router";
import { h } from "preact";
import { useMemo } from "preact/hooks";
import { Regions } from "../../db/regions";
import { WeaponMaterial, WeaponMaterials } from "../../db/weaponMaterials";
import { Domains } from "../../db/domains";
import { DomainDropSets } from "../../db/domainDropSets";
import { cx } from "emotion";
import { Weapon, Weapons } from "../../db/weapons";

const materialToWeapons = Weapons.reduce((x, c) => {
  const list = x[c.material.name];

  if (list) list.push(c);
  else x[c.material.name] = [c];

  return x;
}, {} as { [key: string]: Weapon[] });

const WeaponList = ({ search }: { search: string }) => {
  const list = useMemo(() => {
    const text = search.toLowerCase();
    const set = new Set<Weapon>();

    for (const weapon of Weapons) {
      if (
        weapon.name.toLowerCase().includes(text) ||
        weapon.material.name.toLowerCase().includes(text)
      ) {
        set.add(weapon);
      }
    }

    function addByMaterial(material: string) {
      const weapons = materialToWeapons[material];
      if (weapons) {
        for (const weapon of weapons) {
          set.add(weapon);
        }
      }
    }

    for (const region of Regions) {
      if (region.name.toLowerCase().includes(text)) {
        for (const domain of region.domains) {
          for (const drops of domain.drops) {
            for (const item of drops.items) {
              addByMaterial(item.name);
            }
          }
        }
      }
    }

    for (const domain of Domains) {
      if (domain.name.toLowerCase().includes(text)) {
        for (const drops of domain.drops) {
          for (const item of drops.items) {
            addByMaterial(item.name);
          }
        }
      }
    }

    for (const drops of DomainDropSets) {
      if (drops.name && drops.name.toLowerCase().includes(text)) {
        for (const item of drops.items) {
          addByMaterial(item.name);
        }
      }
    }

    return Array.from(set).sort((a, b) => a.name.localeCompare(b.name));
  }, [search]);

  if (list.length === 0) {
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

      {list.map(weapon => (
        <Link key={weapon.name} href={`/weapons/${weapon.name}`}>
          <WeaponIcon weapon={weapon} />
        </Link>
      ))}
    </div>
  );
};

const WeaponIcon = ({ weapon }: { weapon: Weapon }) => {
  return (
    <div
      className={cx(
        "inline-block m-1 text-center bg-white text-black rounded shadow-lg w-32",
        { "opacity-50": false }
      )}
    >
      <img
        className="w-20 h-20 mx-auto mt-2 object-cover"
        src={`/assets/weapons/${weapon.name}.png`}
      />

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
