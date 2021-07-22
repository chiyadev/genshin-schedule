import React, { memo } from "react";
import { AspectRatio, Center, chakra, Link, useColorModeValue, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import IconImage from "../IconImage";
import { Artifact } from "../../../db/artifacts";
import { FormattedMessage as FormattedMessageId } from "react-intl";

const Icon = ({ visible = true, artifact, added }: { visible?: boolean; artifact: Artifact; added?: boolean }) => {
  return (
    <NextLink href={`/customize/artifacts/${artifact.name}`} passHref>
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
            opacity={added ? 0.3 : 1}
            transition=".2s"
          >
            <Center minH={0} flex={1}>
              <IconImage name={artifact.name} h="full" objectFit="contain" />
            </Center>

            <chakra.div isTruncated textAlign="center" maxW="100%">
              <FormattedMessageId id={artifact.name} />
            </chakra.div>
          </VStack>
        </AspectRatio>
      </Link>
    </NextLink>
  );
};

export default memo(Icon);
