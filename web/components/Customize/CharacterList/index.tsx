import React, { memo, useMemo } from "react";
import { CharacterSearch } from "./search";
import Icon from "./Icon";
import { Anemo } from "../../../assets";
import { chakra, Grid, HStack, VStack } from "@chakra-ui/react";
import { useConfig } from "../../../utils/configs";

const CharacterList = () => {
  const [search] = useConfig("customizeQuery");
  const all = useMemo(() => CharacterSearch.search("").sort((a, b) => a.name.localeCompare(b.name)), []);
  const results = useMemo(() => new Set(CharacterSearch.search(search)), [search]);

  return (
    <VStack align="stretch" spacing={4} d={results.size ? undefined : "none"}>
      <HStack fontSize="xl" fontWeight="bold" spacing={2} color="white">
        <chakra.img alt="Character" src={Anemo} w={8} h={8} />
        <div>Characters</div>
      </HStack>

      <Grid templateColumns="repeat(auto-fill, minmax(7rem, 1fr))" gap={2}>
        {all.map((character) => (
          <Icon key={character.name} visible={results.has(character)} character={character} />
        ))}
      </Grid>
    </VStack>
  );
};

export default memo(CharacterList);
