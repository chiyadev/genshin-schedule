import React, { memo, useMemo } from "react";
import { arrayToggle } from "../../../utils";
import { trackEvent } from "../../../utils/umami";
import { useConfig } from "../../../utils/config";
import { chakra, Checkbox, VStack } from "@chakra-ui/react";
import { Weapon } from "../../../db/weapons";
import { FormattedMessage } from "react-intl";

const Toggle = ({ weapon }: { weapon: Weapon }) => {
  const [list, setList] = useConfig("weapons");
  const exists = useMemo(() => list.includes(weapon.name), [list, weapon]);

  return (
    <Checkbox
      isChecked={exists}
      onChange={({ target: { checked } }) => {
        setList((list) => arrayToggle(list, weapon.name, checked));
        trackEvent("weapon", "toggle");
      }}
    >
      <VStack align="start" spacing={0}>
        <div>
          <FormattedMessage defaultMessage="Show on schedule" />
        </div>

        <chakra.div fontSize="sm" color="gray.500">
          <FormattedMessage defaultMessage="Scheduled domains will appear on the days they are available." />
        </chakra.div>
      </VStack>
    </Checkbox>
  );
};

export default memo(Toggle);
