import React, { memo } from "react";
import { Character } from "../../../db/characters";
import { TalentMaterial, TalentMaterialWiki } from "../../../db/talentMaterials";
import DropLabel from "../../DropLabel";
import Toggle from "./Toggle";
import { chakra, HStack, Link, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import { FormattedMessage } from "react-intl";

const MaterialDisplay = ({
  character,
  material,
  isWeekly,
}: {
  character: Character;
  material: TalentMaterial;
  isWeekly?: boolean;
}) => {
  return (
    <VStack align="start" spacing={4}>
      <HStack spacing={2}>
        <chakra.img alt={material.item} src={getAssetByName(material.item)} w={10} h={10} />

        <div>
          <chakra.div fontSize="lg">
            <Link href={material.wiki} isExternal>
              <FormattedMessage id={material.name} />
            </Link>
          </chakra.div>
          <chakra.div fontSize="sm" color="gray.500">
            <Link href={TalentMaterialWiki} isExternal>
              <FormattedMessage id={material.type} />
            </Link>
          </chakra.div>
        </div>
      </HStack>

      <DropLabel item={material} />
      <Toggle character={character} isWeekly={isWeekly} />
    </VStack>
  );
};

export default memo(MaterialDisplay);
