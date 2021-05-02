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
import { FormattedMessage } from "react-intl";

const FilterButtons = () => {
  return (
    <ButtonGroup isAttached>
      <FilterButton type="character" image={useColorModeValue(BlackCharacter, WhiteCharacter)} />
      <FilterButton type="weapon" image={useColorModeValue(BlackWeapon, WhiteWeapon)} />
      <FilterButton type="artifact" image={useColorModeValue(BlackArtifact, WhiteArtifact)} />
    </ButtonGroup>
  );
};

const FilterButton = ({ type, image }: { type: Config["domainFilters"][0]; image: string }) => {
  const [filters, setFilters] = useConfig("domainFilters");

  return (
    <Tooltip label={<FormattedMessage id={type} />}>
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
