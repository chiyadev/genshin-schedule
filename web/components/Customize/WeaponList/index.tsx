import React, { memo, useMemo } from "react";
import { WeaponSearch } from "./search";
import Icon from "./Icon";
import { Grid, Heading, VStack } from "@chakra-ui/react";
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
          <Icon key={weapon.name} visible={results.has(weapon)} weapon={weapon} added={weapons.includes(weapon.name)} />
        ))}
      </Grid>
    </VStack>
  );
};

export default memo(WeaponList);
