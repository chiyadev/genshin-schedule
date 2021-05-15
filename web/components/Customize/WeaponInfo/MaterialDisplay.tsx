import React, { memo } from "react";
import { TalentMaterialWiki } from "../../../db/talentMaterials";
import DropLabel from "../../DropLabel";
import Toggle from "./Toggle";
import { chakra, HStack, Link, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import { WeaponMaterial } from "../../../db/weaponMaterials";
import { Weapon } from "../../../db/weapons";
import { FormattedMessage as FormattedMessageId } from "react-intl";

const MaterialDisplay = ({ weapon, material }: { weapon: Weapon; material: WeaponMaterial }) => {
  return (
    <VStack align="start" spacing={4}>
      <HStack spacing={2}>
        <chakra.img alt={material.item} src={getAssetByName(material.item)} w={10} h={10} />

        <div>
          <chakra.div fontSize="lg">
            <Link href={material.wiki} isExternal>
              <FormattedMessageId id={material.name} />
            </Link>
          </chakra.div>
          <chakra.div fontSize="sm" color="gray.500">
            <Link href={TalentMaterialWiki} isExternal>
              <FormattedMessageId id={material.type} />
            </Link>
          </chakra.div>
        </div>
      </HStack>

      <DropLabel item={material} />
      <Toggle weapon={weapon} />
    </VStack>
  );
};

export default memo(MaterialDisplay);
