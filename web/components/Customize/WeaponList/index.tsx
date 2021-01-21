import React, { memo, useMemo } from "react";
import { WeaponSearch } from "./search";
import Icon from "./Icon";
import { WhiteWeapon } from "../../../assets";
import { chakra, Grid, HStack, VStack } from "@chakra-ui/react";
import { useConfig } from "../../../utils/configs";

const WeaponList = () => {
  const [search] = useConfig("customizeQuery");
  const all = useMemo(() => WeaponSearch.search("").sort((a, b) => a.name.localeCompare(b.name)), []);
  const results = useMemo(() => new Set(WeaponSearch.search(search)), [search]);

  return (
    <VStack align="stretch" spacing={4} d={results.size ? undefined : "none"}>
      <HStack fontSize="xl" fontWeight="bold" spacing={2} color="white">
        <chakra.img alt="Weapon" src={WhiteWeapon} w={8} h={8} objectFit="cover" />
        <div>Weapons</div>
      </HStack>

      <Grid templateColumns="repeat(auto-fill, minmax(7rem, 1fr))" gap={2}>
        {all.map((weapon) => (
          <Icon key={weapon.name} visible={results.has(weapon)} weapon={weapon} />
        ))}
      </Grid>
    </VStack>
  );
};

export default memo(WeaponList);
