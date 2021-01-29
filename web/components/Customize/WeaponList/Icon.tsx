import React, { memo, useMemo } from "react";
import { useConfig } from "../../../utils/configs";
import { AspectRatio, Center, chakra, HStack, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import NextLink from "next/link";
import { Weapon } from "../../../db/weapons";
import IconImage from "../IconImage";

const Icon = ({ visible = true, weapon }: { visible?: boolean; weapon: Weapon }) => {
  const [existing] = useConfig("weapons");
  const alreadyAdded = useMemo(() => existing.includes(weapon.name), [existing, weapon.name]);

  return (
    <NextLink href={`/weapons/${weapon.name}`} passHref>
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
            opacity={alreadyAdded ? 0.25 : 1}
            transition=".2s"
          >
            <Center minH={0} flex={1}>
              <IconImage name={weapon.name} h="full" objectFit="cover" />
            </Center>

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
        </AspectRatio>
      </Link>
    </NextLink>
  );
};

export default memo(Icon);
