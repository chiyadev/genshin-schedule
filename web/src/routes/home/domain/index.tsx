import React, { memo, useMemo } from "react";
import { Domain, Domains } from "../../../db/domains";
import { getServerDayOfWeek, useServerDate } from "../../../time";
import { useConfig } from "../../../configs";
import { Character, Characters } from "../../../db/characters";
import {
  DomainCategories,
  DomainCategory,
  DomainOfBlessing,
  DomainOfForgery,
  DomainOfMastery,
  Trounce,
} from "../../../db/domainCategories";
import { DomainDropSet, DomainDropSets } from "../../../db/domainDropSets";
import { TalentMaterial } from "../../../db/talentMaterials";
import { WeaponMaterial } from "../../../db/weaponMaterials";
import { Weapon, Weapons } from "../../../db/weapons";
import { Region, Regions } from "../../../db/regions";
import { FaTimes } from "react-icons/fa";
import { Artifact, Artifacts } from "../../../db/artifacts";
import DomainDisplay from "./domain";
import Heading from "../heading";

export type ScheduledDomain = {
  domain: Domain;
  region?: Region;
  category?: DomainCategory;
  talentMaterials: {
    material: TalentMaterial;
    characters: Character[];
  }[];
  weaponMaterials: {
    material: WeaponMaterial;
    weapons: Weapon[];
  }[];
  artifacts: Artifact[];
};

const DomainView = () => {
  const date = useServerDate(60000);
  const dayOfWeek = getServerDayOfWeek(date);

  const [characters] = useConfig("characters");
  const [weapons] = useConfig("weapons");
  const [artifacts] = useConfig("artifacts");

  // build schedule
  const domains = useMemo(() => {
    const results: ScheduledDomain[] = [];

    const getScheduled = (domain: Domain) => {
      let scheduled = results.find((result) => result.domain === domain);

      if (!scheduled) {
        const region = Regions.find((region) =>
          region.domains.includes(domain)
        );
        const category = DomainCategories.find((category) =>
          category.domains.includes(domain)
        );

        results.push(
          (scheduled = {
            domain,
            region,
            category,
            talentMaterials: [],
            weaponMaterials: [],
            artifacts: [],
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

    const currentDrops = DomainDropSets.filter((drops) =>
      drops.days.includes(dayOfWeek)
    );

    for (const charName of characters) {
      const character = Characters.find((char) => char.name === charName);

      if (character) {
        for (const drops of currentDrops) {
          if (drops.items.includes(character.talentMaterial)) {
            const domain = getDomainFromDrops(drops);
            const scheduled = domain && getScheduled(domain);

            if (scheduled) {
              const group = scheduled.talentMaterials.find(
                (x) => x.material === character.talentMaterial
              );

              if (group) {
                group.characters.push(character);
              } else {
                scheduled.talentMaterials.push({
                  material: character.talentMaterial,
                  characters: [character],
                });
              }
            }
          }
        }
      }
    }

    for (const weaponName of weapons) {
      const weapon = Weapons.find((weapon) => weapon.name === weaponName);

      if (weapon) {
        for (const drops of currentDrops) {
          if (drops.items.includes(weapon.material)) {
            const domain = getDomainFromDrops(drops);
            const scheduled = domain && getScheduled(domain);

            if (scheduled) {
              const group = scheduled.weaponMaterials.find(
                (x) => x.material === weapon.material
              );

              if (group) {
                group.weapons.push(weapon);
              } else {
                scheduled.weaponMaterials.push({
                  material: weapon.material,
                  weapons: [weapon],
                });
              }
            }
          }
        }
      }
    }

    for (const artName of artifacts) {
      const artifact = Artifacts.find((artifact) => artifact.name === artName);

      if (artifact) {
        for (const drops of currentDrops) {
          if (drops.items.includes(artifact)) {
            const domain = getDomainFromDrops(drops);
            const scheduled = domain && getScheduled(domain);

            scheduled && scheduled.artifacts.push(artifact);
          }
        }
      }
    }

    const cates: (DomainCategory | undefined)[] = [
      Trounce,
      DomainOfMastery,
      DomainOfForgery,
      DomainOfBlessing,
    ];

    return results.sort((a, b) => {
      const category = cates.indexOf(a.category) - cates.indexOf(b.category);
      if (category !== 0) return category;

      return a.domain.name.localeCompare(b.domain.name);
    });
  }, [characters, weapons, artifacts, dayOfWeek]);

  const [hidden] = useConfig("hiddenWidgets");

  return useMemo(
    () => (
      <div className="space-y-4">
        <Heading type="domains">
          Today&apos;s Domains
          {domains.length !== 0 && <span> ({domains.length})</span>}
        </Heading>

        {!hidden.domains &&
          (domains.length ? (
            <div className="space-y-4 flex flex-col">
              {domains.map((domain) => (
                <DomainDisplay key={domain.domain.name} {...domain} />
              ))}
            </div>
          ) : (
            <div className="text-sm">
              <FaTimes className="inline" />
              <span> No domains for today. Maybe try some </span>
              <a href="https://genshin-impact.fandom.com/wiki/Ley_Line_Outcrops">
                Ley Lines
              </a>
              ?
            </div>
          ))}
      </div>
    ),
    [domains, hidden.domains]
  );
};

export default memo(DomainView);
