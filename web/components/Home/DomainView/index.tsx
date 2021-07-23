import React, { memo, useMemo } from "react";
import { Domain, Domains } from "../../../db/domains";
import { getServerResetTime, useServerTime, Weekdays } from "../../../utils/time";
import { useConfig } from "../../../utils/config";
import { Character, Characters } from "../../../db/characters";
import {
  DomainCategories,
  DomainCategory,
  DomainOfBlessing,
  DomainOfForgery,
  DomainOfMastery,
  NormalBoss,
  Trounce,
} from "../../../db/domainCategories";
import { DomainDropSet, DomainDropSets } from "../../../db/domainDropSets";
import { TalentMaterial } from "../../../db/talentMaterials";
import { WeaponMaterial } from "../../../db/weaponMaterials";
import { Weapon, Weapons } from "../../../db/weapons";
import { Region, Regions } from "../../../db/regions";
import { Artifact, Artifacts } from "../../../db/artifacts";
import DomainDisplay from "./DomainDisplay";
import WidgetWrapper from "../WidgetWrapper";
import { Alert, AlertIcon, AlertTitle, Grid, Link, useColorModeValue, VStack } from "@chakra-ui/react";
import FilterButtons from "./FilterButtons";
import styles from "./index.module.css";
import { FormattedMessage } from "react-intl";
import NextLink from "next/link";
import { CharacterMaterial } from "../../../db/characterMaterials";

export type ScheduledDomain = {
  domain: Domain;
  region: Region;
  category: DomainCategory;
  materials: {
    material: CharacterMaterial | TalentMaterial | WeaponMaterial;
    parents: (Character | Weapon)[];
  }[];
  artifacts: Artifact[];
};

const DomainView = () => {
  const time = useServerTime(60000);
  const today = Weekdays[(6 + getServerResetTime(time).weekday) % 7];

  const [filter] = useConfig("domainFilter");
  const [characters] = useConfig("characters");
  const [charactersWeekly] = useConfig("charactersWeekly");
  const [charactersGem] = useConfig("charactersGem");
  const [charactersNormalBoss] = useConfig("charactersNormalBoss");
  const [weapons] = useConfig("weapons");
  const [artifacts] = useConfig("artifacts");

  // build schedule
  const domains = useMemo(() => {
    const results: ScheduledDomain[] = [];

    const getScheduled = (domain: Domain) => {
      let scheduled = results.find((result) => result.domain === domain);

      if (!scheduled) {
        const region = Regions.find((region) => region.domains.includes(domain)) as any;
        const category = DomainCategories.find((category) => category.domains.includes(domain)) as any;

        results.push(
          (scheduled = {
            domain,
            region,
            category,
            materials: [],
            artifacts: [],
          })
        );
      }

      return scheduled;
    };

    const getDomainFromDrops = (drops: DomainDropSet) => {
      for (const domain of Domains) {
        if (domain.drops.includes(drops)) {
          return domain;
        }
      }
    };

    for (const drops of DomainDropSets.filter((drops) => drops.days.includes(today))) {
      if (filter === "today" && drops.days.length === 7) {
        continue;
      }

      const addMaterial = (
        parent: ScheduledDomain["materials"][0]["parents"][0],
        material: ScheduledDomain["materials"][0]["material"]
      ) => {
        if (drops.items.includes(material)) {
          const domain = getDomainFromDrops(drops);

          if (domain) {
            const scheduled = getScheduled(domain);
            const group = scheduled.materials.find((x) => x.material === material);

            if (group) {
              group.parents.push(parent);
            } else {
              scheduled.materials.push({
                material,
                parents: [parent],
              });
            }
          }
        }
      };

      const addArtifact = (artifact: ScheduledDomain["artifacts"][0]) => {
        if (drops.items.includes(artifact)) {
          const domain = getDomainFromDrops(drops);

          if (domain) {
            getScheduled(domain).artifacts.push(artifact);
          }
        }
      };

      if (filter === "all" || filter === "today" || filter === "character") {
        for (const char of charactersWeekly) {
          const character = Characters.find((character) => character.name === char);
          character && addMaterial(character, character.talentMaterialWeekly);
        }

        for (const char of characters) {
          const character = Characters.find((character) => character.name === char);
          character && addMaterial(character, character.talentMaterial);
        }

        for (const char of charactersGem) {
          const character = Characters.find((character) => character.name === char);
          character && addMaterial(character, character.materials[0]);
        }

        for (const char of charactersNormalBoss) {
          const character = Characters.find((character) => character.name === char);
          character && addMaterial(character, character.materials[1]);
        }
      }

      if (filter === "all" || filter === "today" || filter === "weapon") {
        for (const weap of weapons) {
          const weapon = Weapons.find((weapon) => weapon.name === weap);
          weapon && addMaterial(weapon, weapon.material);
        }
      }

      if (filter === "all" || filter === "today" || filter === "artifact") {
        for (const arti of artifacts) {
          const artifact = Artifacts.find((artifact) => artifact.name === arti);
          artifact && addArtifact(artifact);
        }
      }
    }

    for (const result of results) {
      result.materials.sort((a, b) => a.material.name.localeCompare(b.material.name));

      for (const group of result.materials) {
        group.parents.sort((a, b) => a.name.localeCompare(b.name));
      }

      result.artifacts.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results.sort((a, b) => {
      const category = DomainCategories.indexOf(a.category) - DomainCategories.indexOf(b.category);
      if (category) return category;

      const region = Regions.indexOf(a.region) - Regions.indexOf(b.region);
      if (region) return region;

      const name = a.domain.name.localeCompare(b.domain.name);
      return name;
    });
  }, [filter, characters, charactersWeekly, charactersGem, charactersNormalBoss, weapons, artifacts, today]);

  const domainColumns = useMemo(() => {
    const results: ScheduledDomain[][] = [];

    const addCategories = (...categories: DomainCategory[]) => {
      results.push(domains.filter(({ category }) => categories.includes(category)));
    };

    switch (filter) {
      case "weapon":
        addCategories(Trounce, DomainOfForgery);
        addCategories(NormalBoss);
        break;

      case "artifact":
        addCategories(Trounce, DomainOfBlessing);
        addCategories(NormalBoss);
        break;

      default:
        addCategories(Trounce, DomainOfMastery);
        addCategories(DomainOfForgery, DomainOfBlessing, NormalBoss);
        break;
    }

    return results.filter((c) => c.length);
  }, [domains, filter]);

  return (
    <WidgetWrapper
      type="domains"
      heading={
        <span>
          <FormattedMessage defaultMessage="Today's Domains" />
          {!!domains.length && <span> ({domains.length})</span>}
        </span>
      }
      menu={(!!domains.length || filter !== "all") && <FilterButtons />}
    >
      {domains.length ? (
        <Grid className={domainColumns.length > 1 ? styles.grid : undefined} gap={4}>
          {domainColumns.map((domains, i) => (
            <VStack key={i} align="stretch" spacing={4}>
              {domains.map((domain) => (
                <DomainDisplay key={domain.domain.name} {...domain} />
              ))}
            </VStack>
          ))}
        </Grid>
      ) : (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <VStack align="start" spacing={0}>
            <AlertTitle>
              <FormattedMessage defaultMessage="No domains for today." />
            </AlertTitle>
            <div>
              <FormattedMessage
                defaultMessage="Go to {customize} to add domains, or maybe try some {link}?"
                values={{
                  customize: (
                    <NextLink href="/customize" passHref>
                      <Link color={useColorModeValue("blue.500", "blue.300")}>
                        <FormattedMessage defaultMessage="Customize" />
                      </Link>
                    </NextLink>
                  ),
                  link: (
                    <Link
                      href="https://genshin-impact.fandom.com/wiki/Ley_Line_Outcrops"
                      color={useColorModeValue("blue.500", "blue.300")}
                      isExternal
                    >
                      <FormattedMessage defaultMessage="Ley Lines" />
                    </Link>
                  ),
                }}
              />
            </div>
          </VStack>
        </Alert>
      )}
    </WidgetWrapper>
  );
};

export default memo(DomainView);
