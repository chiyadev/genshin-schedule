import React, { memo, useMemo } from "react";
import { useConfig } from "../../../utils/configs";
import { AspectRatio, chakra, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import NextLink from "next/link";
import { Weapon } from "../../../db/weapons";
import IconImage from "../IconImage";

const Icon = ({ visible = true, weapon }: { visible?: boolean; weapon: Weapon }) => {
  const [existing] = useConfig("weapons");
  const alreadyAdded = useMemo(() => existing.includes(weapon.name), [existing, weapon.name]);

  return (
    <AspectRatio ratio={5 / 6} css={{ display: visible ? undefined : "none" }}>
      <NextLink href={`/weapons/${weapon.name}`} passHref>
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
            <IconImage name={weapon.name} h="full" objectFit="cover" />
          </VStack>

          <VStack spacing={0} maxW="100%">
            <Text isTruncated maxW="100%">
              {weapon.name}
            </Text>

            <HStack fontSize="sm" color="gray.500" spacing={1} maxW="100%">
              <chakra.img alt={weapon.material.item} src={getAssetByName(weapon.material.item)} w={3} h={3} />
              <Text isTruncated>{weapon.material.name}</Text>
            </HStack>
          </VStack>
        </VStack>
      </NextLink>
    </AspectRatio>
  );
};

export default memo(Icon);
