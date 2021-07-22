import React, { memo, useMemo } from "react";
import { Character } from "../../../db/characters";
import { useConfig } from "../../../utils/config";
import { AspectRatio, Badge, Center, chakra, HStack, Link, useColorModeValue, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import NextLink from "next/link";
import IconImage from "../IconImage";
import { FormattedMessage, FormattedMessage as FormattedMessageId } from "react-intl";

const Icon = ({ visible = true, character }: { visible?: boolean; character: Character }) => {
  const [charactersWeekly] = useConfig("charactersWeekly");
  const [characters] = useConfig("characters");

  const alreadyAdded = useMemo(
    () => new Set([...charactersWeekly, ...characters]).has(character.name),
    [charactersWeekly, characters, character.name]
  );

  return (
    <NextLink href={`/customize/characters/${character.name}`} passHref>
      <Link d={visible ? undefined : "none"} borderRadius="md">
        <AspectRatio ratio={5 / 6}>
          <VStack
            align="stretch"
            p={2}
            spacing={2}
            borderRadius="md"
            overflow="hidden"
            bg={useColorModeValue("white", "gray.900")}
            borderWidth={1}
            borderColor={useColorModeValue("gray.200", "gray.700")}
            opacity={alreadyAdded ? 0.3 : 1}
            transition=".2s"
          >
            <Center minH={0} flex={1}>
              <IconImage name={character.name} h="full" borderRadius="full" objectFit="cover" />
            </Center>

            <VStack spacing={1}>
              <div>
                <FormattedMessageId id={character.name} />
              </div>

              {character.talentMaterials.length ? (
                <Badge colorScheme={character.talentMaterials[0].colorHint}>
                  <HStack spacing={1}>
                    <chakra.img
                      alt={character.talentMaterials[0].item}
                      src={getAssetByName(character.talentMaterials[0].item)}
                      w={3}
                      h={3}
                    />

                    <div>
                      <FormattedMessageId id={character.talentMaterials[0].name} />
                    </div>
                  </HStack>
                </Badge>
              ) : (
                <Badge color="gray.500">
                  <FormattedMessage defaultMessage="Unknown" />
                </Badge>
              )}
            </VStack>
          </VStack>
        </AspectRatio>
      </Link>
    </NextLink>
  );
};

export default memo(Icon);
