import React, { memo, useMemo } from "react";
import WhiteCard from "../../WhiteCard";
import { ScheduledDomain } from "./index";
import MaterialDisplay from "./MaterialDisplay";
import ArtifactDisplay from "./ArtifactDisplay";
import { chakra, HStack, Link } from "@chakra-ui/react";
import { Domain } from "../../../assets";

const DomainDisplay = ({ domain, region, category, talentMaterials, weaponMaterials, artifacts }: ScheduledDomain) => {
  return (
    <WhiteCard divide>
      <HStack spacing={2}>
        <chakra.img alt="Domain" src={Domain} w={10} h={10} objectFit="contain" />

        <div>
          <chakra.div fontSize="xl" fontWeight="bold">
            <Link href={domain.wiki} isExternal>
              {domain.name}
            </Link>
          </chakra.div>
          <chakra.div fontSize="sm" color="gray.500">
            {category && (
              <Link href={category.wiki} isExternal>
                {category.name}
              </Link>
            )}
            <span>, </span>
            {region && (
              <Link href={region.wiki} isExternal>
                {region.name}
              </Link>
            )}
          </chakra.div>
        </div>
      </HStack>

      {useMemo(
        () =>
          talentMaterials.map(({ material, characters }) => (
            <MaterialDisplay key={material.name} material={material} items={characters} path="characters" roundIcon />
          )),
        [talentMaterials]
      )}

      {useMemo(
        () =>
          weaponMaterials.map(({ material, weapons }) => (
            <MaterialDisplay key={material.name} material={material} items={weapons} path="weapons" />
          )),
        [weaponMaterials]
      )}

      {useMemo(() => !!artifacts.length && <ArtifactDisplay artifacts={artifacts} />, [artifacts])}
    </WhiteCard>
  );
};

export default memo(DomainDisplay);
