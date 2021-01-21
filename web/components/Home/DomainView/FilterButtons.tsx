import React, { memo } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { trackEvent } from "../../../utils/umami";
import { useConfig } from "../../../utils/configs";
import { arrayToggle } from "../../../utils";
import { WhiteAnemo, WhiteArtifact, WhiteWeapon } from "../../../assets";

const FilterButtons = () => {
  const [filters, setFilters] = useConfig("domainFilters");

  return (
    <ButtonGroup isAttached>
      <Tooltip label="Characters">
        <Button
          as="button"
          variant="ghost"
          color="white"
          w={8}
          h={8}
          p={1}
          minW={0}
          opacity={filters.includes("character") ? 1 : 0.5}
          onClick={() => {
            setFilters((filters) => arrayToggle(filters, "character"));
            trackEvent("domainView", "filterCharacters");
          }}
        >
          <img src={WhiteAnemo} />
        </Button>
      </Tooltip>

      <Tooltip label="Weapons">
        <Button
          as="button"
          variant="ghost"
          color="white"
          w={8}
          h={8}
          p={1}
          minW={0}
          opacity={filters.includes("weapon") ? 1 : 0.5}
          onClick={() => {
            setFilters((filters) => arrayToggle(filters, "weapon"));
            trackEvent("domainView", "filterWeapons");
          }}
        >
          <img src={WhiteWeapon} />
        </Button>
      </Tooltip>

      <Tooltip label="Artifacts">
        <Button
          as="button"
          variant="ghost"
          color="white"
          w={8}
          h={8}
          p={1}
          minW={0}
          opacity={filters.includes("artifact") ? 1 : 0.5}
          onClick={() => {
            setFilters((filters) => arrayToggle(filters, "artifact"));
            trackEvent("domainView", "filterArtifacts");
          }}
        >
          <img src={WhiteArtifact} />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
};

export default memo(FilterButtons);
