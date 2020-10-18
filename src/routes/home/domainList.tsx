import { h } from "preact";
import { css, cx } from "emotion";
import { Domain, Domains } from "../../db/domains";
import { useMemo } from "preact/hooks";
import {
  getServerDayOfWeek,
  useRerenderFrequency,
  useServerDate
} from "../../time";
import { useConfig } from "../../configs";
import { Character, Characters } from "../../db/characters";
import { DomainCategories } from "../../db/domainCategories";
import { DomainDropSet, DomainDropSets } from "../../db/domainDropSets";
import { TalentMaterial } from "../../db/talentMaterials";
import { Link } from "preact-router";

type ScheduledDomain = {
  domain: Domain;
  talentMaterials: {
    material: TalentMaterial;
    characters: Character[];
  }[];
};

const DomainList = () => {
  const date = useServerDate();
  const dayOfWeek = getServerDayOfWeek(date);

  useRerenderFrequency(1000);

  const [characters] = useConfig("characters");

  const domains = useMemo(() => {
    const results: ScheduledDomain[] = [];

    const getScheduled = (domain: Domain) => {
      let scheduled = results.find(result => result.domain === domain);

      if (!scheduled) {
        results.push(
          (scheduled = {
            domain,
            talentMaterials: []
          })
        );
      }

      return scheduled;
    };

    const getDomainFromDrops = (drops: DomainDropSet) => {
      for (const domain of Domains) {
        if (domain.drops.includes(drops)) return domain;
      }
    };

    for (const charName of characters) {
      const character = Characters.find(char => char.name === charName);

      if (character) {
        for (const drops of DomainDropSets) {
          if (
            drops.days.includes(dayOfWeek) &&
            drops.items.includes(character.talentMaterial)
          ) {
            const domain = getDomainFromDrops(drops);
            const scheduled = domain && getScheduled(domain);

            if (scheduled) {
              const group = scheduled.talentMaterials.find(
                x => x.material === character.talentMaterial
              );
              if (group) {
                group.characters.push(character);
              } else {
                scheduled.talentMaterials.push({
                  material: character.talentMaterial,
                  characters: [character]
                });
              }
            }
          }
        }
      }
    }

    return results.sort((a, b) => a.domain.name.localeCompare(b.domain.name));
  }, [characters, dayOfWeek]);

  return useMemo(
    () => (
      <div className="space-y-4 flex flex-col">
        {domains.map(domain => (
          <DomainDisplay key={domain.domain.name} {...domain} />
        ))}
      </div>
    ),
    [domains]
  );
};

const DomainDisplay = ({ domain, talentMaterials }: ScheduledDomain) => {
  const category = useMemo(() => {
    return DomainCategories.find(category => category.domains.includes(domain));
  }, [domain]);

  return (
    <div
      className={cx(
        "w-full border border-white shadow-lg rounded",
        css`
          background-color: rgba(0, 0, 0, 0.1);
        `
      )}
    >
      <a href={domain.wiki}>
        <div className="w-full p-4 bg-white text-black flex flex-row w-full">
          <img
            src="/assets/game/domain.png"
            className="mr-2 w-10 object-contain"
          />

          <div className="flex flex-col justify-center">
            <div className="text-lg font-bold">{domain.name}</div>
            <div className="text-xs text-gray-600">{category?.name}</div>
          </div>
        </div>
      </a>

      <div className="divide-y divide-gray-800">
        {useMemo(
          () =>
            talentMaterials.map(material => (
              <TalentMaterialDisplay
                key={material.material.name}
                {...material}
              />
            )),
          [talentMaterials]
        )}
      </div>
    </div>
  );
};

const TalentMaterialDisplay = ({
  material,
  characters
}: ScheduledDomain["talentMaterials"][0]) => {
  return (
    <div className="p-4 space-y-2">
      <a href={material.wiki}>
        <div className="space-x-2 flex flex-row">
          <img
            src={`/assets/talents/Item_Teachings_of__${material.name}_.png`}
            className="w-12 h-12"
          />
          <div className="flex flex-col justify-center">
            <div className="text-lg">{material.name}</div>
            <div className="text-xs text-gray-600">{material.type}</div>
          </div>
        </div>
      </a>

      {characters.map(character => (
        <Link
          key={character.name}
          className="pl-4 flex flex-row space-x-2"
          href={`/characters/${character.name}`}
        >
          <img
            className="x-8 h-8 rounded-full"
            src={`/assets/characters/Character_${character.name}_Thumb.png`}
          />

          <div className="flex flex-col justify-center">{character.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default DomainList;
