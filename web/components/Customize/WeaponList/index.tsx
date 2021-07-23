import React, { memo, useMemo } from "react";
import { WeaponSearch } from "./search";
import Icon from "./Icon";
import { chakra, Grid, Heading, VStack } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { FormattedMessage } from "react-intl";

const WeaponList = () => {
  const [search] = useConfig("customizeQuery");
  const [weapons] = useConfig("weapons");

  const all = useMemo(() => WeaponSearch.search("").sort((a, b) => a.name.localeCompare(b.name)), []);
  const results = useMemo(() => new Set(WeaponSearch.search(search)), [search]);

  return (
    <VStack align="stretch" spacing={4} d={results.size ? undefined : "none"}>
      <Heading size="md">
        <FormattedMessage defaultMessage="Weapons" />
      </Heading>

      <Grid templateColumns="repeat(auto-fill, minmax(7rem, 1fr))" gap={2}>
        {all.map((weapon) => (
          <chakra.div d={results.has(weapon) ? undefined : "none"} opacity={weapons.includes(weapon.name) ? 0.3 : 1}>
            <Icon key={weapon.name} weapon={weapon} />
          </chakra.div>
        ))}
      </Grid>
    </VStack>
  );
};

export default memo(WeaponList);
