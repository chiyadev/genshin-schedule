import React, { memo } from "react";
import { TalentMaterial, TalentMaterialWiki } from "../../../db/talentMaterials";
import { WeaponMaterial, WeaponMaterialWiki } from "../../../db/weaponMaterials";
import { Character } from "../../../db/characters";
import { Weapon } from "../../../db/weapons";
import NoteText from "./NoteText";
import NextLink from "next/link";
import { chakra, HStack, Link, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";

const MaterialDisplay = ({
  material,
  items,
  path,
  roundIcon,
}: {
  material: TalentMaterial | WeaponMaterial;
  items: (Character | Weapon)[];
  path: "characters" | "weapons";
  roundIcon?: boolean;
}) => {
  return (
    <VStack align="stretch" spacing={4}>
      <HStack spacing={2}>
        <chakra.img alt={material.name} src={getAssetByName(material.item)} w={10} h={10} objectFit="contain" />

        <div>
          <chakra.div fontSize="lg">
            <Link href={material.wiki} isExternal>
              {material.name}
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
              {material.type}
            </Link>
          </chakra.div>
        </div>
      </HStack>

      <VStack align="start" spacing={2} pl={4}>
        {items.map((item) => (
          <HStack key={item.name} spacing={2}>
            <chakra.img
              alt={item.name}
              src={getAssetByName(item.name)}
              w={6}
              h={6}
              objectFit="contain"
              borderRadius={roundIcon ? "full" : undefined}
            />

            <div>
              <NextLink href={`/${path}/${item.name}`} passHref>
                <Link>{item.name}</Link>
              </NextLink>

              <NoteText name={item.name} />
            </div>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default memo(MaterialDisplay);
