import React, { memo, useMemo } from "react";
import { ArtifactSearch } from "./search";
import Icon from "./Icon";
import { chakra, Grid, Heading, VStack } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { FormattedMessage } from "react-intl";
import styles from "../grid.module.css";

const ArtifactList = () => {
  const [search] = useConfig("customizeQuery");
  const [artifacts] = useConfig("artifacts");

  const all = useMemo(() => ArtifactSearch.search("").sort((a, b) => a.name.localeCompare(b.name)), []);
  const results = useMemo(() => new Set(ArtifactSearch.search(search)), [search]);

  return (
    <VStack align="stretch" spacing={4} d={results.size ? undefined : "none"}>
      <Heading size="md">
        <FormattedMessage defaultMessage="Artifacts" />
      </Heading>

      <Grid gap={2} className={styles.grid}>
        {all.map((artifact) => (
          <chakra.div
            key={artifact.name}
            d={results.has(artifact) ? undefined : "none"}
            opacity={artifacts.includes(artifact.name) ? 0.3 : 1}
          >
            <Icon artifact={artifact} />
          </chakra.div>
        ))}
      </Grid>
    </VStack>
  );
};

export default memo(ArtifactList);
