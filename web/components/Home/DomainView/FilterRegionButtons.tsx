import React, { memo, ReactNode } from "react";
import { Button, ButtonGroup, chakra, useColorModeValue } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { trackEvent } from "../../../utils/umami";
import { Config, useConfig } from "../../../utils/config";
import { BlackInazuma, BlackLiyue, BlackMondstadt, WhiteInazuma, WhiteLiyue, WhiteMondstadt } from "../../../assets";
import { FormattedMessage } from "react-intl";

const FilterRegionButtons = () => {
  return (
    <ButtonGroup isAttached>
      <FilterButton
        type="mondstadt"
        label={<FormattedMessage defaultMessage="Mondstadt" />}
        image={useColorModeValue(BlackMondstadt.src, WhiteMondstadt.src)}
      />

      <FilterButton
        type="liyue"
        label={<FormattedMessage defaultMessage="Liyue" />}
        image={useColorModeValue(BlackLiyue.src, WhiteLiyue.src)}
      />

      <FilterButton
        type="inazuma"
        label={<FormattedMessage defaultMessage="Inazuma" />}
        image={useColorModeValue(BlackInazuma.src, WhiteInazuma.src)}
      />
    </ButtonGroup>
  );
};

const FilterButton = ({
  type,
  label,
  image,
}: {
  type: Config["domainFilterRegion"];
  label: ReactNode;
  image?: string;
}) => {
  const [filter, setFilter] = useConfig("domainFilterRegion");

  return (
    <Tooltip label={label} closeOnClick={false}>
      <Button
        as="button"
        variant="ghost"
        w={8}
        h={8}
        p={0}
        minW={0}
        onClick={() => {
          if (filter === type) {
            setFilter("all");
          } else {
            setFilter(type);
            trackEvent("domainView", `filter${type}`);
          }
        }}
      >
        {image && <chakra.img src={image} w={5} transition=".2s" opacity={filter === type ? 1 : 0.3} />}
      </Button>
    </Tooltip>
  );
};

export default memo(FilterRegionButtons);
