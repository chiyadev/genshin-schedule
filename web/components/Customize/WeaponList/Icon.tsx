import React, { memo } from "react";
import { AspectRatio, Badge, Center, chakra, HStack, Link, useColorModeValue, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import NextLink from "next/link";
import { Weapon } from "../../../db/weapons";
import IconImage from "../IconImage";
import { FormattedMessage as FormattedMessageId } from "react-intl";

const Icon = ({ weapon }: { weapon: Weapon }) => {
  return (
    <NextLink href={`/customize/weapons/${weapon.name}`} passHref>
      <Link borderRadius="md">
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
            transition=".2s"
          >
            <Center minH={0} flex={1}>
              <IconImage name={weapon.name} h="full" objectFit="cover" />
            </Center>

            <VStack spacing={1} maxW="100%">
              <chakra.div isTruncated maxW="100%" fontSize="sm" fontWeight="500">
                <FormattedMessageId id={weapon.name} />
              </chakra.div>

              <Badge maxW="100%" colorScheme={weapon.material.colorHint}>
                <HStack spacing={1}>
                  <chakra.img
                    alt={weapon.material.item}
                    title={weapon.material.item}
                    src={getAssetByName(weapon.material.item)}
                    w={3}
                    h={3}
                  />

                  <chakra.div isTruncated>
                    <FormattedMessageId id={weapon.material.name} />
                  </chakra.div>
                </HStack>
              </Badge>
            </VStack>
          </VStack>
        </AspectRatio>
      </Link>
    </NextLink>
  );
};

export default memo(Icon);
