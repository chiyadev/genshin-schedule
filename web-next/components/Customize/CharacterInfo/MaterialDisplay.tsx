import React, { memo } from "react";
import { Character } from "../../../db/characters";
import { TalentMaterial, TalentMaterialWiki } from "../../../db/talentMaterials";
import DropLabel from "../../DropLabel";
import Toggle from "./Toggle";
import { chakra, HStack, Link, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";

const MaterialDisplay = ({ character, material }: { character: Character; material: TalentMaterial }) => {
  return (
    <VStack align="start" spacing={4}>
      <HStack spacing={2}>
        <chakra.img alt={material.item} src={getAssetByName(material.item)} w={10} h={10} />

        <div>
          <chakra.div fontSize="lg">
            <Link href={material.wiki} isExternal>
              {material.name}
            </Link>
          </chakra.div>
          <chakra.div fontSize="sm" color="gray.500">
            <Link href={TalentMaterialWiki} isExternal>
              {material.type}
            </Link>
          </chakra.div>
        </div>
      </HStack>

      <DropLabel item={material} />
      <Toggle character={character} />
    </VStack>
  );
};

export default memo(MaterialDisplay);
