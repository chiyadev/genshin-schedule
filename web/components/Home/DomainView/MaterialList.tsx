import React, { memo } from "react";
import { TalentMaterialWiki } from "../../../db/talentMaterials";
import { WeaponMaterialWiki } from "../../../db/weaponMaterials";
import { Badge, chakra, HStack, Link, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import Item from "./Item";
import { FormattedMessage as FormattedMessageId, useIntl } from "react-intl";
import { CharacterMaterialWiki } from "../../../db/characterMaterials";
import { ScheduledDomain } from ".";

const MaterialList = ({ material, linked, auxiliary }: ScheduledDomain["materials"][0]) => {
  const { formatMessage } = useIntl();
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
    <VStack
      align="stretch"
      spacing={4}
      opacity={auxiliary ? 0.5 : 1}
      title={auxiliary ? formatMessage({ defaultMessage: "This item is not guaranteed to drop." }) : undefined}
    >
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
