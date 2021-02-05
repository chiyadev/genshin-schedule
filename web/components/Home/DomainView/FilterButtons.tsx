import React, { memo } from "react";
import { Button, ButtonGroup, useColorModeValue } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { trackEvent } from "../../../utils/umami";
import { Config, useConfig } from "../../../utils/config";
import { arrayToggle } from "../../../utils";
import {
  BlackArtifact,
  BlackCharacter,
  BlackWeapon,
  WhiteArtifact,
  WhiteCharacter,
  WhiteWeapon,
} from "../../../assets";

const FilterButtons = () => {
  return (
    <ButtonGroup isAttached>
      <FilterButton type="character" name="Characters" image={useColorModeValue(BlackCharacter, WhiteCharacter)} />
      <FilterButton type="weapon" name="Weapons" image={useColorModeValue(BlackWeapon, WhiteWeapon)} />
      <FilterButton type="artifact" name="Artifacts" image={useColorModeValue(BlackArtifact, WhiteArtifact)} />
    </ButtonGroup>
  );
};

const FilterButton = ({ type, name, image }: { type: Config["domainFilters"][0]; name: string; image: string }) => {
  const [filters, setFilters] = useConfig("domainFilters");

  return (
    <Tooltip label={name}>
      <Button
        as="button"
        variant="ghost"
        w={8}
        h={8}
        p={1}
        minW={0}
        opacity={filters.includes(type) ? 1 : 0.5}
        onClick={() => {
          setFilters((filters) => arrayToggle(filters, type));
          !filters.includes(type) && trackEvent("domainView", `filter${name}`);
        }}
      >
        <img src={image} />
      </Button>
    </Tooltip>
  );
};

export default memo(FilterButtons);
