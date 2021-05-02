import React, { memo, useMemo } from "react";
import { CharacterSearch } from "./search";
import Icon from "./Icon";
import { Grid, Heading, VStack } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { FormattedMessage } from "react-intl";

const CharacterList = () => {
  const [search] = useConfig("customizeQuery");
  const all = useMemo(() => CharacterSearch.search("").sort((a, b) => a.name.localeCompare(b.name)), []);
  const results = useMemo(() => new Set(CharacterSearch.search(search)), [search]);

  return (
    <VStack align="stretch" spacing={4} d={results.size ? undefined : "none"}>
      <Heading size="md">
        <FormattedMessage id="characters" />
      </Heading>

      <Grid templateColumns="repeat(auto-fill, minmax(7rem, 1fr))" gap={2}>
        {all.map((character) => (
          <Icon key={character.name} visible={results.has(character)} character={character} />
        ))}
      </Grid>
    </VStack>
  );
};

export default memo(CharacterList);
