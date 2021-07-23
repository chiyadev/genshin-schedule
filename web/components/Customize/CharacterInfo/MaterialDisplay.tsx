import React, { memo } from "react";
import { Character } from "../../../db/characters";
import { TalentMaterial, TalentMaterialWiki } from "../../../db/talentMaterials";
import DropLabel from "../../DropLabel";
import Toggle, { CharacterListName } from "./Toggle";
import { Badge, chakra, HStack, Link, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import { FormattedMessage as FormattedMessageId } from "react-intl";
import { CharacterMaterial, CharacterMaterialWiki } from "../../../db/characterMaterials";

const MaterialDisplay = ({
  character,
  material,
  listName,
}: {
  character: Character;
  material: CharacterMaterial | TalentMaterial;
  listName: CharacterListName;
}) => {
  let wiki: string;

  switch (material.type) {
    case "Character Ascension Material":
      wiki = CharacterMaterialWiki;
      break;

    case "Talent Level-Up Material":
      wiki = TalentMaterialWiki;
      break;
  }

  return (
    <VStack align="start" spacing={4}>
      <HStack spacing={2}>
        <chakra.img alt={material.item} title={material.item} src={getAssetByName(material.item)} w={10} h={10} />

        <div>
          <chakra.div fontSize="lg">
            <Link href={material.wiki} isExternal>
              <FormattedMessageId id={material.name} />
            </Link>
          </chakra.div>

          <Badge color="gray.500">
            <Link href={wiki} isExternal>
              <FormattedMessageId id={material.type} />
            </Link>
          </Badge>
        </div>
      </HStack>

      <DropLabel item={material} />
      <Toggle character={character} listName={listName} />
    </VStack>
  );
};

export default memo(MaterialDisplay);
