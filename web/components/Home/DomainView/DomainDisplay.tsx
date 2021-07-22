import React, { memo, useMemo } from "react";
import WhiteCard from "../../WhiteCard";
import { ScheduledDomain } from "./index";
import MaterialList from "./MaterialList";
import ArtifactList from "./ArtifactList";
import { Badge, chakra, HStack, Link } from "@chakra-ui/react";
import { Domain } from "../../../assets";
import { FormattedMessage, FormattedMessage as FormattedMessageId } from "react-intl";

const DomainDisplay = ({ domain, region, category, talentMaterials, weaponMaterials, artifacts }: ScheduledDomain) => {
  return (
    <WhiteCard divide>
      <HStack spacing={2}>
        <chakra.img alt="Domain" src={Domain.src} w={10} h={10} objectFit="contain" />

        <div>
          <chakra.div fontSize="xl" fontWeight="bold">
            <Link href={domain.wiki} isExternal>
              <FormattedMessageId id={domain.name} />
            </Link>
          </chakra.div>

          <Badge colorScheme={category?.colorHint}>
            <FormattedMessage
              defaultMessage="{category}, {region}"
              values={{
                category: category && (
                  <Link href={category.wiki} isExternal>
                    <FormattedMessageId id={category.name} />
                  </Link>
                ),
                region: region && (
                  <Link href={region.wiki} isExternal>
                    <FormattedMessageId id={region.name} />
                  </Link>
                ),
              }}
            />
          </Badge>
        </div>
      </HStack>

      {useMemo(
        () =>
          talentMaterials.map(({ material, characters }) => (
            <MaterialList key={material.name} material={material} items={characters} path="characters" />
          )),
        [talentMaterials]
      )}

      {useMemo(
        () =>
          weaponMaterials.map(({ material, weapons }) => (
            <MaterialList key={material.name} material={material} items={weapons} path="weapons" />
          )),
        [weaponMaterials]
      )}

      {useMemo(() => !!artifacts.length && <ArtifactList artifacts={artifacts} />, [artifacts])}
    </WhiteCard>
  );
};

export default memo(DomainDisplay);
