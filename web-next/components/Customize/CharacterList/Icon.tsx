import React, { memo, useMemo } from "react";
import { Character } from "../../../db/characters";
import { useConfig } from "../../../utils/configs";
import { AspectRatio, chakra, HStack, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import NextLink from "next/link";
import { Link } from "@chakra-ui/layout";
import IconImage from "../IconImage";

const Icon = ({ visible = true, character }: { visible?: boolean; character: Character }) => {
  const [existing] = useConfig("characters");
  const alreadyAdded = useMemo(() => existing.includes(character.name), [existing, character.name]);

  return (
    <AspectRatio ratio={5 / 6} css={{ display: visible ? undefined : "none" }}>
      <NextLink href={`/characters/${character.name}`} passHref>
        <VStack
          as={Link}
          align="stretch"
          p={2}
          spacing={2}
          borderRadius="md"
          overflow="hidden"
          bg="white"
          color="black"
          boxShadow="lg"
          opacity={alreadyAdded ? 0.5 : 1}
          transition=".2s all"
        >
          <VStack minH={0} flex={1}>
            <IconImage name={character.name} h="full" borderRadius="full" />
          </VStack>

          <VStack spacing={0}>
            <div>{character.name}</div>

            <HStack fontSize="sm" color="gray.500" spacing={1}>
              <chakra.img
                alt={character.talentMaterials[0].item}
                src={getAssetByName(character.talentMaterials[0].item)}
                w={3}
                h={3}
              />

              <div>{character.talentMaterials[0].name}</div>
            </HStack>
          </VStack>
        </VStack>
      </NextLink>
    </AspectRatio>
  );
};

export default memo(Icon);
