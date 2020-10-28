import React, { memo, useMemo } from "react";
import { WeaponSearch } from "./search";
import Icon from "./icon";
import { Link } from "react-router-dom";

const WeaponList = ({ search }: { search: string }) => {
  const results = useMemo(
    () =>
      WeaponSearch.search(search).sort((a, b) => a.name.localeCompare(b.name)),
    [search]
  );

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="text-xl font-bold">
        <img
          alt="Weapon"
          src="/assets/game/Skyward Pride.png"
          className="w-8 h-8 inline object-cover"
        />

        <span className="align-middle"> Weapons</span>
      </div>

      <div>
        {results.map((weapon) => (
          <Link key={weapon.name} to={`/weapons/${weapon.name}`}>
            <Icon weapon={weapon} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(WeaponList);
