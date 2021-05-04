import React, { memo } from "react";
import { TalentMaterial, TalentMaterialWiki } from "../../../db/talentMaterials";
import { WeaponMaterial, WeaponMaterialWiki } from "../../../db/weaponMaterials";
import { Character } from "../../../db/characters";
import { Weapon } from "../../../db/weapons";
import { chakra, HStack, Link, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import Item from "./Item";
import { FormattedMessage as FormattedMessageId } from "react-intl";

const MaterialList = ({
  material,
  items,
  path,
}: {
  material: TalentMaterial | WeaponMaterial;
  items: (Character | Weapon)[];
  path: "characters" | "weapons";
}) => {
  return (
    <VStack align="stretch" spacing={4}>
      <HStack spacing={2}>
        <chakra.img alt={material.name} src={getAssetByName(material.item)} w={10} h={10} objectFit="contain" />

        <div>
          <chakra.div fontSize="lg">
            <Link href={material.wiki} isExternal>
              <FormattedMessageId id={material.name} />
            </Link>
          </chakra.div>
          <chakra.div fontSize="sm" color="gray.500">
            <Link
              href={
                material.type === "Talent Level-Up Material"
                  ? TalentMaterialWiki
                  : material.type === "Weapon Ascension Material"
                  ? WeaponMaterialWiki
                  : undefined
              }
              isExternal
            >
              <FormattedMessageId id={material.type} />
            </Link>
          </chakra.div>
        </div>
      </HStack>

      <VStack align="start" spacing={2} pl={4}>
        {items.map(({ name }) => (
          <Item key={name} path={path} name={name} />
        ))}
      </VStack>
    </VStack>
  );
};

export default memo(MaterialList);
