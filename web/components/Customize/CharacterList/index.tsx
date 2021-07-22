import React, { memo, useMemo } from "react";
import { CharacterSearch } from "./search";
import Icon from "./Icon";
import { Grid, Heading, VStack } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { FormattedMessage } from "react-intl";

const CharacterList = () => {
  const [search] = useConfig("customizeQuery");
  const [characters] = useConfig("characters");
  const [charactersWeekly] = useConfig("charactersWeekly");
  const [charactersGem] = useConfig("charactersGem");
  const [charactersNormalBoss] = useConfig("charactersNormalBoss");

  const all = useMemo(() => CharacterSearch.search("").sort((a, b) => a.name.localeCompare(b.name)), []);
  const results = useMemo(() => new Set(CharacterSearch.search(search)), [search]);

  const added = useMemo(
    () => new Set([...charactersWeekly, ...characters, ...charactersGem, ...charactersNormalBoss]),
    [charactersWeekly, characters, charactersGem, charactersNormalBoss]
  );

  return (
    <VStack align="stretch" spacing={4} d={results.size ? undefined : "none"}>
      <Heading size="md">
        <FormattedMessage defaultMessage="Characters" />
      </Heading>

      <Grid templateColumns="repeat(auto-fill, minmax(7rem, 1fr))" gap={2}>
        {all.map((character) => (
          <Icon
            key={character.name}
            visible={results.has(character)}
            character={character}
            added={added.has(character.name)}
          />
        ))}
      </Grid>
    </VStack>
  );
};

export default memo(CharacterList);
