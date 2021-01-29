import React, { memo, useMemo } from "react";
import { Domain, Domains } from "../../../db/domains";
import { getServerResetTime, useServerTime, Weekdays } from "../../../utils/time";
import { useConfig } from "../../../utils/configs";
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
import DomainDisplay from "./DomainDisplay";
import WidgetWrapper from "../WidgetWrapper";
import { HStack, Icon, Link, useColorModeValue, VStack } from "@chakra-ui/react";
import FilterButtons from "./FilterButtons";

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
  const time = useServerTime(60000);
  const today = Weekdays[(6 + getServerResetTime(time).weekday) % 7];

  const [filters] = useConfig("domainFilters");
  const [characters] = useConfig("characters");
  const [weapons] = useConfig("weapons");
  const [artifacts] = useConfig("artifacts");
  const [charactersWeekly] = useConfig("charactersWeekly");

  // build schedule
  const domains = useMemo(() => {
    const results: ScheduledDomain[] = [];

    const getScheduled = (domain: Domain) => {
      let scheduled = results.find((result) => result.domain === domain);

      if (!scheduled) {
        const region = Regions.find((region) => region.domains.includes(domain));
        const category = DomainCategories.find((category) => category.domains.includes(domain));

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

    const dropSets = DomainDropSets.filter((drops) => drops.days.includes(today));

    for (const drops of dropSets) {
      if (!filters.length || filters.includes("character")) {
        for (const characterName of characters) {
          const character = Characters.find((char) => char.name === characterName);

          if (character) {
            for (const material of character.talentMaterials) {
              if (drops.items.includes(material)) {
                const domain = getDomainFromDrops(drops);

                if (domain) {
                  const scheduled = getScheduled(domain);
                  const group = scheduled.talentMaterials.find((x) => x.material === material);

                  if (group) {
                    group.characters.push(character);
                  } else {
                    scheduled.talentMaterials.push({
                      material,
                      characters: [character],
                    });
                  }
                }
              }
            }
          }
        }

        for (const characterName of charactersWeekly) {
          const character = Characters.find((char) => char.name === characterName);

          if (character) {
            for (const material of character.talentMaterialWeekly) {
              if (drops.items.includes(material)) {
                const domain = getDomainFromDrops(drops);

                if (domain) {
                  const scheduled = getScheduled(domain);
                  const group = scheduled.talentMaterials.find((x) => x.material === material);

                  if (group) {
                    group.characters.push(character);
                  } else {
                    scheduled.talentMaterials.push({
                      material,
                      characters: [character],
                    });
                  }
                }
              }
            }
          }
        }
      }

      if (!filters.length || filters.includes("weapon")) {
        for (const weaponName of weapons) {
          const weapon = Weapons.find((weapon) => weapon.name === weaponName);

          if (weapon) {
            if (drops.items.includes(weapon.material)) {
              const domain = getDomainFromDrops(drops);

              if (domain) {
                const scheduled = getScheduled(domain);
                const group = scheduled.weaponMaterials.find((x) => x.material === weapon.material);

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

      if (!filters.length || filters.includes("artifact")) {
        for (const artifactName of artifacts) {
          const artifact = Artifacts.find((artifact) => artifact.name === artifactName);

          if (artifact) {
            if (drops.items.includes(artifact)) {
              const domain = getDomainFromDrops(drops);

              if (domain) {
                const scheduled = getScheduled(domain);

                scheduled.artifacts.push(artifact);
              }
            }
          }
        }
      }
    }

    const categoryOrder: (DomainCategory | undefined)[] = [Trounce, DomainOfMastery, DomainOfForgery, DomainOfBlessing];

    return results.sort((a, b) => {
      const category = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
      if (category) return category;

      return a.domain.name.localeCompare(b.domain.name);
    });
  }, [filters, characters, charactersWeekly, weapons, artifacts, today]);

  const [hidden] = useConfig("hiddenWidgets");

  return useMemo(
    () => (
      <WidgetWrapper
        type="domains"
        heading={<span>Today&apos;s Domains{!!domains.length && <span> ({domains.length})</span>}</span>}
        menu={<FilterButtons />}
      >
        {domains.length ? (
          <VStack align="stretch" spacing={4}>
            {domains.map((domain) => (
              <DomainDisplay key={domain.domain.name} {...domain} />
            ))}
          </VStack>
        ) : (
          <HStack spacing={2}>
            <Icon as={FaTimes} />
            <div>
              <span>No domains for today. Maybe try some </span>
              <Link
                href="https://genshin-impact.fandom.com/wiki/Ley_Line_Outcrops"
                color={useColorModeValue("blue.500", "blue.300")}
                isExternal
              >
                Ley Lines
              </Link>
              <span>?</span>
            </div>
          </HStack>
        )}
      </WidgetWrapper>
    ),
    [domains, hidden.domains]
  );
};

export default memo(DomainView);
