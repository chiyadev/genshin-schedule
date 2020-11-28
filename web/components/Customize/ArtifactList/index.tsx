import React, { memo, useMemo } from "react";
import { ArtifactSearch } from "./search";
import Icon from "./Icon";
import { TheExile } from "../../../assets";
import { chakra, Grid, HStack, VStack } from "@chakra-ui/react";
import { useConfig } from "../../../utils/configs";

const ArtifactList = () => {
  const [search] = useConfig("customizeQuery");
  const all = useMemo(() => ArtifactSearch.search("").sort((a, b) => a.name.localeCompare(b.name)), []);
  const results = useMemo(() => new Set(ArtifactSearch.search(search)), [search]);

  return (
    <VStack align="stretch" spacing={4} d={results.size ? undefined : "none"}>
      <HStack fontSize="xl" fontWeight="bold" spacing={2} color="white">
        <chakra.img alt="Artifact" src={TheExile} w={8} h={8} objectFit="contain" />
        <div>Artifacts</div>
      </HStack>

      <Grid templateColumns="repeat(auto-fill, minmax(7rem, 1fr))" gap={2}>
        {all.map((artifact) => (
          <Icon key={artifact.name} visible={results.has(artifact)} artifact={artifact} />
        ))}
      </Grid>
    </VStack>
  );
};

export default memo(ArtifactList);
