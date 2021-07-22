import React, { memo, ReactNode } from "react";
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
      <FilterButton
        type="character"
        label={<FormattedMessage defaultMessage="Characters" />}
        image={useColorModeValue(BlackCharacter.src, WhiteCharacter.src)}
      />

      <FilterButton
        type="weapon"
        label={<FormattedMessage defaultMessage="Weapons" />}
        image={useColorModeValue(BlackWeapon.src, WhiteWeapon.src)}
      />

      <FilterButton
        type="artifact"
        label={<FormattedMessage defaultMessage="Artifacts" />}
        image={useColorModeValue(BlackArtifact.src, WhiteArtifact.src)}
      />
    </ButtonGroup>
  );
};

const FilterButton = ({
  type,
  label,
  image,
}: {
  type: Config["domainFilters"][0];
  label: ReactNode;
  image: string;
}) => {
  const [filters, setFilters] = useConfig("domainFilters");

  return (
    <Tooltip label={label}>
      <Button
        as="button"
        variant="ghost"
        w={8}
        h={8}
        p={1}
        minW={0}
        opacity={filters.includes(type) ? 1 : 0.3}
        onClick={() => {
          setFilters((filters) => arrayToggle(filters, type));
          !filters.includes(type) && trackEvent("domainView", `filter${label}`);
        }}
      >
        <img src={image} />
      </Button>
    </Tooltip>
  );
};

export default memo(FilterButtons);
