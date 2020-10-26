import WhiteCard from "../../../whiteCard";
import { useMemo } from "preact/hooks";
import { h } from "preact";
import { ScheduledDomain } from "./index";
import { memo } from "preact/compat";
import MaterialDisplay from "./material";
import ArtifactDisplay from "./artifact";

const DomainDisplay = ({
  domain,
  region,
  category,
  talentMaterials,
  weaponMaterials,
  artifacts
}: ScheduledDomain) => {
  return (
    <WhiteCard divide>
      <a href={domain.wiki}>
        <div className="space-x-2 py-4 flex flex-row">
          <img
            alt="Domain"
            src="/assets/game/Domain.png"
            className="w-10 object-contain"
          />

          <div className="flex flex-col justify-center">
            <div className="text-lg font-bold">{domain.name}</div>
            <div className="text-xs text-gray-600">
              {category && <a href={category.wiki}>{category.name}</a>}
              {", "}
              {region && <a href={region.wiki}>{region.name}</a>}
            </div>
          </div>
        </div>
      </a>

      {useMemo(
        () =>
          talentMaterials.map(({ material, characters }) => (
            <MaterialDisplay
              key={material.name}
              material={material}
              items={characters}
              path="characters"
              roundItems
            />
          )),
        [talentMaterials]
      )}

      {useMemo(
        () =>
          weaponMaterials.map(({ material, weapons }) => (
            <MaterialDisplay
              key={material.name}
              material={material}
              items={weapons}
              path="weapons"
            />
          )),
        [weaponMaterials]
      )}

      {useMemo(
        () =>
          artifacts.length !== 0 && <ArtifactDisplay artifacts={artifacts} />,
        [artifacts]
      )}
    </WhiteCard>
  );
};

export default memo(DomainDisplay);
