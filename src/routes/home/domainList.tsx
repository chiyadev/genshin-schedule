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
import { WeaponMaterial } from "../../db/weaponMaterials";
import { Weapon, Weapons } from "../../db/weapons";
import { Regions } from "../../db/regions";

type ScheduledDomain = {
  domain: Domain;
  talentMaterials: {
    material: TalentMaterial;
    characters: Character[];
  }[];
  weaponMaterials: {
    material: WeaponMaterial;
    weapons: Weapon[];
  }[];
};

const DomainList = () => {
  const date = useServerDate();
  const dayOfWeek = getServerDayOfWeek(date);

  useRerenderFrequency(1000);

  const [characters] = useConfig("characters");
  const [weapons] = useConfig("weapons");

  const domains = useMemo(() => {
    const results: ScheduledDomain[] = [];

    const getScheduled = (domain: Domain) => {
      let scheduled = results.find(result => result.domain === domain);

      if (!scheduled) {
        results.push(
          (scheduled = {
            domain,
            talentMaterials: [],
            weaponMaterials: []
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

    const currentDrops = DomainDropSets.filter(drops =>
      drops.days.includes(dayOfWeek)
    );

    for (const charName of characters) {
      const character = Characters.find(char => char.name === charName);

      if (character) {
        for (const drops of currentDrops) {
          if (drops.items.includes(character.talentMaterial)) {
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

    for (const weaponName of weapons) {
      const weapon = Weapons.find(weapon => weapon.name === weaponName);

      if (weapon) {
        for (const drops of currentDrops) {
          if (drops.items.includes(weapon.material)) {
            const domain = getDomainFromDrops(drops);
            const scheduled = domain && getScheduled(domain);

            if (scheduled) {
              const group = scheduled.weaponMaterials.find(
                x => x.material === weapon.material
              );

              if (group) {
                group.weapons.push(weapon);
              } else {
                scheduled.weaponMaterials.push({
                  material: weapon.material,
                  weapons: [weapon]
                });
              }
            }
          }
        }
      }
    }

    return results.sort((a, b) => a.domain.name.localeCompare(b.domain.name));
  }, [characters, weapons, dayOfWeek]);

  return useMemo(
    () => (
      <div className="space-y-4">
        <div className="text-lg">Today&apos;s domains</div>

        {domains.length ? (
          <div className="space-y-4 flex flex-col">
            {domains.map(domain => (
              <DomainDisplay key={domain.domain.name} {...domain} />
            ))}
          </div>
        ) : (
          <div className="text-sm">
            Nothing. How about some{" "}
            <a href="https://genshin-impact.fandom.com/wiki/Ley_Line_Outcrops">
              Ley Lines
            </a>{" "}
            instead?
          </div>
        )}
      </div>
    ),
    [domains]
  );
};

const DomainDisplay = ({
  domain,
  talentMaterials,
  weaponMaterials
}: ScheduledDomain) => {
  const region = useMemo(() => {
    return Regions.find(region => region.domains.includes(domain));
  }, [domain]);

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
            src="/assets/game/Domain.png"
            className="mr-2 w-10 object-contain"
          />

          <div className="flex flex-col justify-center">
            <div className="text-lg font-bold">{domain.name}</div>
            <div className="text-xs text-gray-600">
              {category?.name}, {region?.name}
            </div>
          </div>
        </div>
      </a>

      <div className="px-4 divide-y divide-gray-800">
        {useMemo(
          () =>
            talentMaterials.map(({ material, characters }) => (
              <MaterialDisplay
                key={material.name}
                material={material}
                items={characters}
                assetPath="characters"
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
                assetPath="weapons"
              />
            )),
          [talentMaterials]
        )}
      </div>
    </div>
  );
};

const MaterialDisplay = ({
  material,
  items,
  assetPath,
  roundItems
}: {
  material: TalentMaterial | WeaponMaterial;
  items: (Character | Weapon)[];
  assetPath: "characters" | "weapons";
  roundItems?: boolean;
}) => {
  return (
    <div className="py-4 space-y-4">
      <a href={material.wiki}>
        <div className="space-x-2 flex flex-row">
          <img
            src={`/assets/${assetPath}/${material.name}.png`}
            className="w-12 h-12"
          />
          <div className="flex flex-col justify-center">
            <div className="text-lg">{material.name}</div>
            <div className="text-xs text-gray-600">{material.type}</div>
          </div>
        </div>
      </a>

      <div className="space-y-2">
        {items.map(item => (
          <Link
            key={item.name}
            className="pl-4 flex flex-row space-x-2"
            href={`/${assetPath}/${item.name}`}
          >
            <img
              className={cx("w-8 h-8 object-cover", {
                "rounded-full": roundItems
              })}
              src={`/assets/${assetPath}/${item.name}.png`}
            />

            <div className="flex flex-col justify-center">{item.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DomainList;
