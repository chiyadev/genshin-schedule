import React, { memo, useMemo } from "react";
import { Domain, Domains } from "../../../db/domains";
import { getServerResetTime, useServerTime, Weekday, Weekdays } from "../../../utils/time";
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
import { Alert, AlertIcon, AlertTitle, Grid, Link, useColorModeValue, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import FilterTypeButtons from "./FilterTypeButtons";
import FilterRegionButtons from "./FilterRegionButtons";
import styles from "./index.module.css";
import { FormattedMessage } from "react-intl";
import NextLink from "next/link";
import { CharacterMaterial } from "../../../db/characterMaterials";
import FilterButtons from "./FilterButtons";

export type ScheduledDomain = {
  domain: Domain;
  region: Region;
  category: DomainCategory;
  materials: {
    material: CharacterMaterial | TalentMaterial | WeaponMaterial;
    linked: (Character | Weapon)[];
    drops: DomainDropSet;
    auxiliary: boolean;
  }[];
  artifacts: {
    linked: Artifact;
    drops: DomainDropSet;
    auxiliary: boolean;
  }[];
};

const DomainView = () => {
  const time = useServerTime(60000);
  const today = Weekdays[(6 + getServerResetTime(time).weekday) % 7];

  const [filter] = useConfig("domainFilter");
  const [filterType] = useConfig("domainFilterType");
  const [filterRegion] = useConfig("domainFilterRegion");
  const [characters] = useConfig("characters");
  const [charactersWeekly] = useConfig("charactersWeekly");
  const [charactersGem] = useConfig("charactersGem");
  const [charactersNormalBoss] = useConfig("charactersNormalBoss");
  const [weapons] = useConfig("weapons");
  const [artifacts] = useConfig("artifacts");
  const [highlights] = useConfig("itemHighlights");

  // build schedule
  let domains = useMemo(() => {
    let results: ScheduledDomain[] = [];

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
      if (filter === "today" && today !== "sunday" && drops.days.length === 7) {
        continue;
      }

      const addMaterial = (
        linked: ScheduledDomain["materials"][0]["linked"][0],
        material: ScheduledDomain["materials"][0]["material"]
      ) => {
        if ([...drops.items, ...((filter !== "noaux" && drops.itemsAux) || [])].includes(material)) {
          const domain = getDomainFromDrops(drops);

          if (domain) {
            const scheduled = getScheduled(domain);
            const group = scheduled.materials.find((x) => x.material === material);

            if (group) {
              group.linked.push(linked);
            } else {
              scheduled.materials.push({
                material,
                linked: [linked],
                drops,
                auxiliary: drops.itemsAux?.includes(material) || false,
              });
            }
          }
        }
      };

      const addArtifact = (linked: ScheduledDomain["artifacts"][0]["linked"]) => {
        if ([...drops.items, ...((filter !== "noaux" && drops.itemsAux) || [])].includes(linked)) {
          const domain = getDomainFromDrops(drops);

          if (domain) {
            getScheduled(domain).artifacts.push({
              linked,
              drops,
              auxiliary: drops.itemsAux?.includes(linked) || false,
            });
          }
        }
      };

      if (filterType === "all" || filterType === "character") {
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

      if (filterType === "all" || filterType === "weapon") {
        for (const weap of weapons) {
          const weapon = Weapons.find((weapon) => weapon.name === weap);
          weapon && addMaterial(weapon, weapon.material);
        }
      }

      if (filterType === "all" || filterType === "artifact") {
        for (const arti of artifacts) {
          const artifact = Artifacts.find((artifact) => artifact.name === arti);
          artifact && addArtifact(artifact);
        }
      }
    }

    results = results.filter(({ region }) => filterRegion === "all" || region.name.toLowerCase() === filterRegion);

    for (const domain of results) {
      domain.materials.sort((a, b) => a.material.name.localeCompare(b.material.name));

      for (const group of domain.materials) {
        group.linked.sort((a, b) => a.name.localeCompare(b.name));
      }

      domain.artifacts.sort((a, b) => a.linked.name.localeCompare(b.linked.name));
    }

    results = results.sort((a, b) => {
      const category = DomainCategories.indexOf(a.category) - DomainCategories.indexOf(b.category);
      if (category) return category;

      const region = Regions.indexOf(a.region) - Regions.indexOf(b.region);
      if (region) return region;

      const name = a.domain.name.localeCompare(b.domain.name);
      return name;
    });

    if (filter === "efficiency") {
      const set = new Set<string>();
      const add = (s: string) => !set.has(s) && set.add(s);

      results = results
        .map((domain) => {
          let score = domain.artifacts.length;

          for (const { linked } of domain.materials) {
            score += linked.length;
          }

          return { domain, score };
        })
        .sort((a, b) => b.score - a.score)
        .map(({ domain }) => domain);

      const addAll = (auxiliaryFilter: boolean) => {
        for (const domain of results) {
          for (const group of domain.materials) {
            group.auxiliary === auxiliaryFilter &&
              (group.linked = group.linked.filter(({ name }) => add(`${group.material.name}|${name}`)));
          }

          domain.materials = domain.materials.filter(({ linked }) => linked.length);
          domain.artifacts = domain.artifacts.filter(
            ({ linked: { name }, auxiliary }) => auxiliary !== auxiliaryFilter || add(name)
          );
        }
      };

      // non-auxiliary (guaranteed drop) items must be added first in order to ensure correctness of order
      addAll(false);
      addAll(true);

      results = results
        .filter(({ materials, artifacts }) => materials.length || artifacts.length)
        .map((domain) => {
          let score = 0;
          let available = new Set<Weekday>();
          let highlighted = 0;

          for (const { linked, drops } of domain.materials) {
            score += linked.length;
            highlighted += linked.filter(({ name }) => highlights.includes(name)).length;

            for (const day of drops.days) {
              available.add(day);
            }
          }

          for (const { linked, drops } of domain.artifacts) {
            score++;
            highlights.includes(linked.name) && highlighted++;

            for (const day of drops.days) {
              available.add(day);
            }
          }

          return { domain, score, availability: available.size, highlighted };
        })
        .sort((a, b) => {
          const highlighted = b.highlighted - a.highlighted;
          if (highlighted) return highlighted;

          const availability = a.availability - b.availability;
          if (availability) return availability;

          return b.score - a.score;
        })
        .map(({ domain }) => domain);
    }

    return results;
  }, [
    filter,
    filterType,
    filterRegion,
    characters,
    charactersWeekly,
    charactersGem,
    charactersNormalBoss,
    weapons,
    artifacts,
    today,
    highlights,
  ]);

  const domainColumns = useMemo(() => {
    const results: ScheduledDomain[][] = [];

    const addCategories = (...categories: DomainCategory[]) => {
      results.push(domains.filter(({ category }) => categories.includes(category)));
    };

    switch (filterType) {
      case "weapon":
        addCategories(Trounce, DomainOfForgery);
        addCategories(NormalBoss);
        break;

      case "artifact":
        addCategories(Trounce, DomainOfBlessing);
        addCategories(NormalBoss);
        break;

      default:
        addCategories(Trounce, DomainOfMastery, DomainOfForgery);
        addCategories(DomainOfBlessing, NormalBoss);
        break;
    }

    return results.filter((c) => c.length);
  }, [domains, filterType]);

  return (
    <WidgetWrapper
      type="domains"
      heading={
        <span>
          <FormattedMessage defaultMessage="Today's Domains" />
          {!!domains.length && <span> ({domains.length})</span>}
        </span>
      }
      menu={
        (!!domains.length || filterType !== "all") && (
          <Wrap spacing={1} justify="flex-end">
            <WrapItem>
              <FilterButtons />
            </WrapItem>
            <WrapItem>
              <FilterRegionButtons />
            </WrapItem>
            <WrapItem>
              <FilterTypeButtons />
            </WrapItem>
          </Wrap>
        )
      }
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
