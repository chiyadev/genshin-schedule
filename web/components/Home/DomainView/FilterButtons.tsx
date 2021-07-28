import React, { memo, ReactNode } from "react";
import { Button, ButtonGroup, Icon } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { trackEvent } from "../../../utils/umami";
import { Config, useConfig } from "../../../utils/config";
import { FormattedMessage } from "react-intl";
import { Compass } from "react-feather";

const FilterButtons = () => {
  return (
    <ButtonGroup isAttached>
      <FilterButton
        type="efficiency"
        label={<FormattedMessage defaultMessage="Filter by efficiency" />}
        icon={Compass}
      />
    </ButtonGroup>
  );
};

const FilterButton = ({ type, label, icon }: { type: Config["domainFilter"]; label: ReactNode; icon?: any }) => {
  const [filter, setFilter] = useConfig("domainFilter");

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
        {icon && <Icon as={icon} transition=".2s" opacity={filter === type ? 1 : 0.3} />}
      </Button>
    </Tooltip>
  );
};

export default memo(FilterButtons);
