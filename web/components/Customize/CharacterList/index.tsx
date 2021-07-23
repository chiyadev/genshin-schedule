import React, { memo, useMemo } from "react";
import { CharacterSearch } from "./search";
import Icon from "./Icon";
import { chakra, Grid, Heading, VStack } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { FormattedMessage } from "react-intl";
import styles from "../grid.module.css";

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

      <Grid gap={2} className={styles.grid}>
        {all.map((character) => (
          <chakra.div
            key={character.name}
            d={results.has(character) ? undefined : "none"}
            opacity={added.has(character.name) ? 0.3 : 1}
          >
            <Icon character={character} />
          </chakra.div>
        ))}
      </Grid>
    </VStack>
  );
};

export default memo(CharacterList);
