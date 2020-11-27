import React, { memo } from "react";
import { Artifact } from "../../../db/artifacts";
import NoteText from "./NoteText";
import NextLink from "next/link";
import { chakra, HStack, Link, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";

const ArtifactDisplay = ({ artifacts }: { artifacts: Artifact[] }) => {
  return (
    <VStack align="start" spacing={2} pl={4}>
      {artifacts.map((item) => (
        <HStack spacing={2}>
          <chakra.img alt={item.name} src={getAssetByName(item.name)} w={6} h={6} />

          <NextLink key={item.name} href={`/artifacts/${item.name}`} passHref>
            <Link>{item.name}</Link>
          </NextLink>

          <NoteText name={item.name} />
        </HStack>
      ))}
    </VStack>
  );
};

export default memo(ArtifactDisplay);
