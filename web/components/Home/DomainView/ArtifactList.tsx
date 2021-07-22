import React, { memo } from "react";
import { Artifact } from "../../../db/artifacts";
import { VStack } from "@chakra-ui/react";
import Item from "./Item";

const ArtifactList = ({ artifacts }: { artifacts: Artifact[] }) => {
  return (
    <VStack align="start" spacing={2} pl={4}>
      {artifacts.map((artifact) => (
        <Item key={artifact.name} {...artifact} />
      ))}
    </VStack>
  );
};

export default memo(ArtifactList);
