import React, { memo } from "react";
import { chakra, VStack } from "@chakra-ui/react";
import Item from "./Item";
import { ScheduledDomain } from ".";
import { useIntl } from "react-intl";

const ArtifactList = ({ artifacts }: { artifacts: ScheduledDomain["artifacts"] }) => {
  const { formatMessage } = useIntl();

  return (
    <VStack align="start" spacing={2} pl={4}>
      {artifacts.map(({ linked, auxiliary }) => (
        <chakra.div
          key={linked.name}
          opacity={auxiliary ? 0.5 : 1}
          title={auxiliary ? formatMessage({ defaultMessage: "This item is not guaranteed to drop." }) : undefined}
        >
          <Item {...linked} />
        </chakra.div>
      ))}
    </VStack>
  );
};

export default memo(ArtifactList);
