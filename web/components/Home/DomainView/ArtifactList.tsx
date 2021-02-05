import React, { memo } from "react";
import { Artifact } from "../../../db/artifacts";
import { VStack } from "@chakra-ui/react";
import Item from "./Item";

const ArtifactList = ({ artifacts }: { artifacts: Artifact[] }) => {
  return (
    <VStack align="start" spacing={2} pl={4}>
      {artifacts.map(({ name }) => (
        <Item key={name} path="artifacts" name={name} />
      ))}
    </VStack>
  );
};

export default memo(ArtifactList);
