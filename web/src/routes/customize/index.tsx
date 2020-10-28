import React, { memo, useEffect } from "react";
import { useConfig } from "../../configs";
import Search from "./search";
import CharacterList from "./character";
import Help from "./help";
import WeaponList from "./weapon";
import { forceCheck } from "react-lazyload";
import { useTabTitle } from "../../utils";
import Miscellaneous from "./miscellaneous";
import ArtifactList from "./artifact";

const Customize = () => {
  const [search, setSearch] = useConfig("customizeQuery");

  useTabTitle("Customize");
  useEffect(forceCheck, [search]);

  return (
    <div className="container mx-auto p-4">
      <Search value={search} setValue={setSearch} />

      <div className="mt-2">
        <Help />
      </div>

      <div className="mt-8 space-y-8">
        <CharacterList search={search} />
        <WeaponList search={search} />
        <ArtifactList search={search} />
        <Miscellaneous search={search} />
      </div>
    </div>
  );
};

export default memo(Customize);
