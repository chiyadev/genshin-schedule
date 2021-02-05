import React, { memo, useMemo } from "react";
import { useConfig } from "../../../utils/config";
import { AspectRatio, Center, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import IconImage from "../IconImage";
import { Artifact } from "../../../db/artifacts";

const Icon = ({ visible = true, artifact }: { visible?: boolean; artifact: Artifact }) => {
  const [existing] = useConfig("artifacts");
  const alreadyAdded = useMemo(() => existing.includes(artifact.name), [existing, artifact.name]);

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
            opacity={alreadyAdded ? 0.25 : 1}
            transition=".2s"
          >
            <Center minH={0} flex={1}>
              <IconImage name={artifact.name} h="full" objectFit="contain" />
            </Center>

            <Text isTruncated textAlign="center" maxW="100%">
              {artifact.name}
            </Text>
          </VStack>
        </AspectRatio>
      </Link>
    </NextLink>
  );
};

export default memo(Icon);
