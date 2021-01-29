import React, { memo } from "react";
import { useConfig } from "../../utils/configs";
import { ButtonGroup, HStack, Spacer } from "@chakra-ui/react";
import pluralize from "pluralize";
import ResetButton from "./ResetButton";

const InfoText = () => {
  const [stats] = useConfig("stats");
  const [retention] = useConfig("statRetention");
  const first = stats.length && stats[0];
  const last = stats.length && stats[stats.length - 1];

  return (
    <HStack align="start" spacing={2}>
      <div>
        <p>
          Range: {first && first.id}~{last && last.id}
        </p>
        <p>
          Retention: {retention} {pluralize("day", retention)}
        </p>
      </div>
      <Spacer />

      <ButtonGroup>
        <ResetButton />
      </ButtonGroup>
    </HStack>
  );
};

export default memo(InfoText);
