import React, { memo } from "react";
import { TalentMaterial, TalentMaterialWiki } from "../../../db/talentMaterials";
import { WeaponMaterial, WeaponMaterialWiki } from "../../../db/weaponMaterials";
import { Character } from "../../../db/characters";
import { Weapon } from "../../../db/weapons";
import { Badge, chakra, HStack, Link, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import Item from "./Item";
import { FormattedMessage as FormattedMessageId } from "react-intl";
import { CharacterMaterial, CharacterMaterialWiki } from "../../../db/characterMaterials";

const MaterialList = ({
  material,
  linked,
}: {
  material: CharacterMaterial | TalentMaterial | WeaponMaterial;
  linked: (Character | Weapon)[];
}) => {
  let wiki: string;

  switch (material.type) {
    case "Character Ascension Material":
      wiki = CharacterMaterialWiki;
      break;

    case "Talent Level-Up Material":
      wiki = TalentMaterialWiki;
      break;

    case "Weapon Ascension Material":
      wiki = WeaponMaterialWiki;
      break;
  }

  return (
    <VStack align="stretch" spacing={4}>
      <HStack spacing={2}>
        <chakra.img
          alt={material.name}
          title={material.item}
          src={getAssetByName(material.item)}
          w={10}
          h={10}
          objectFit="contain"
        />

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

      <VStack align="start" spacing={2} pl={4}>
        {linked.map((linked) => (
          <Item key={linked.name} {...linked} />
        ))}
      </VStack>
    </VStack>
  );
};

export default memo(MaterialList);
