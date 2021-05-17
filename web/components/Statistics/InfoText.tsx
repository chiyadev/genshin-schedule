import React, { memo } from "react";
import { useConfig } from "../../utils/config";
import { ButtonGroup, HStack, Spacer } from "@chakra-ui/react";
import ResetButton from "./ResetButton";
import { FormattedMessage } from "react-intl";
import { useFormatDurationPart } from "../../utils/time";
import { Duration } from "luxon";

const InfoText = () => {
  const [stats] = useConfig("stats");
  const [retention] = useConfig("statRetention");
  const first = stats.length && stats[0];
  const last = stats.length && stats[stats.length - 1];

  return (
    <HStack align="start" spacing={2}>
      <div>
        <p>
          <FormattedMessage defaultMessage="Range" />: {first && first.id}~{last && last.id}
        </p>
        <p>
          <FormattedMessage defaultMessage="Duration" />:{" "}
          {useFormatDurationPart(Duration.fromObject({ days: retention }), "day")}
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
