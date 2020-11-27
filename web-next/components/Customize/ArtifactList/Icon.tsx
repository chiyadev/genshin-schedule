import React, { memo, useMemo } from "react";
import { useConfig } from "../../../utils/configs";
import { AspectRatio, Link, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import IconImage from "../IconImage";
import { Artifact } from "../../../db/artifacts";

const Icon = ({ visible = true, artifact }: { visible?: boolean; artifact: Artifact }) => {
  const [existing] = useConfig("artifacts");
  const alreadyAdded = useMemo(() => existing.includes(artifact.name), [existing, artifact.name]);

  return (
    <AspectRatio ratio={5 / 6} css={{ display: visible ? undefined : "none" }}>
      <NextLink href={`/artifacts/${artifact.name}`} passHref>
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
            <IconImage name={artifact.name} h="full" objectFit="contain" />
          </VStack>

          <Text isTruncated textAlign="center" maxW="100%">
            {artifact.name}
          </Text>
        </VStack>
      </NextLink>
    </AspectRatio>
  );
};

export default memo(Icon);
