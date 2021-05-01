import React, { memo, useMemo } from "react";
import WhiteCard from "../../WhiteCard";
import { ScheduledDomain } from "./index";
import MaterialList from "./MaterialList";
import ArtifactList from "./ArtifactList";
import { chakra, HStack, Link } from "@chakra-ui/react";
import { Domain } from "../../../assets";
import { FormattedMessage } from "react-intl";

const DomainDisplay = ({ domain, region, category, talentMaterials, weaponMaterials, artifacts }: ScheduledDomain) => {
  return (
    <WhiteCard divide>
      <HStack spacing={2}>
        <chakra.img alt="Domain" src={Domain} w={10} h={10} objectFit="contain" />

        <div>
          <chakra.div fontSize="xl" fontWeight="bold">
            <Link href={domain.wiki} isExternal>
              <FormattedMessage id={domain.name} />
            </Link>
          </chakra.div>
          <chakra.div fontSize="sm" color="gray.500">
            <FormattedMessage
              id="domainLocation"
              values={{
                category: category && (
                  <Link href={category.wiki} isExternal>
                    <FormattedMessage id={category.name} />
                  </Link>
                ),
                region: region && (
                  <Link href={region.wiki} isExternal>
                    <FormattedMessage id={region.name} />
                  </Link>
                ),
              }}
            />
          </chakra.div>
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
