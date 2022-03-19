import React, { memo } from "react";
import WhiteCard from "../WhiteCard";
import {
  Heading,
  HStack,
  StackDivider,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
  useToken,
  VStack,
} from "@chakra-ui/react";
import { StatFrame, useConfig, useCurrentStats } from "../../utils/config";
import { DateTime } from "luxon";
import { ResinsPerMinute } from "../../db/resins";
import { useEfficiencyColor } from "./color";
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from "victory";
import { FormattedMessage } from "react-intl";

const ResinStats = () => {
  return (
    <VStack align="stretch" spacing={4}>
      <Heading size="md">
        <FormattedMessage defaultMessage="Resins spent" />
      </Heading>

      <WhiteCard divide>
        <HStack
          align="stretch"
          spacing={0}
          divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.700")} />}
        >
          <TodayPanel />
          <TotalPanel />
          <PeakPanel />
        </HStack>

        <ResinGraph />
      </WhiteCard>
    </VStack>
  );
};

function usePeakFrame(stats: StatFrame[]) {
  let peak: StatFrame | undefined;

  for (const frame of stats) {
    if (!frame.resinsSpent) {
      continue;
    }

    if (peak) {
      frame.resinsSpent >= peak.resinsSpent && (peak = frame);
    } else {
      peak = frame;
    }
  }

  return peak;
}

const ResinsPerDay = ResinsPerMinute * 60 * 24;

const TodayPanel = () => {
  const [stats] = useCurrentStats();
  const value = stats?.resinsSpent || 0;
  const color = useEfficiencyColor(value / ResinsPerDay);

  return (
    <Stat flex={1} textAlign="center">
      <StatLabel>
        <FormattedMessage defaultMessage="Today" />
      </StatLabel>

      <StatNumber my={1}>
        <Heading color={color}>{value}</Heading>
      </StatNumber>
    </Stat>
  );
};

const TotalPanel = () => {
  const [stats] = useConfig("stats");
  const [retention] = useConfig("statRetention");
  const value = stats.reduce((total, { resinsSpent }) => total + resinsSpent, 0);
  const color = useEfficiencyColor(value / (ResinsPerDay * retention));

  return (
    <Stat flex={1} textAlign="center">
      <StatLabel>
        <FormattedMessage defaultMessage="Total" />
      </StatLabel>

      <StatNumber my={1}>
        <Heading color={color}>{value}</Heading>
      </StatNumber>

      <StatHelpText>
        <FormattedMessage
          defaultMessage="{percent}% efficiency"
          values={{ percent: Math.round((value / (ResinsPerDay * retention)) * 100) }}
        />
      </StatHelpText>
    </Stat>
  );
};

const PeakPanel = () => {
  const [stats] = useConfig("stats");
  const peak = usePeakFrame(stats);
  const value = peak?.resinsSpent || 0;
  const color = useEfficiencyColor(value / ResinsPerDay);

  return (
    <Stat flex={1} textAlign="center">
      <StatLabel>
        <FormattedMessage defaultMessage="Peak" />
      </StatLabel>

      <StatNumber my={1}>
        <Heading color={color}>{value}</Heading>
      </StatNumber>

      <StatHelpText>
        {peak ? DateTime.fromMillis(peak.time).toLocaleString() : <FormattedMessage defaultMessage="Never" />}
      </StatHelpText>
    </Stat>
  );
};

const ResinGraph = () => {
  const [stats] = useConfig("stats");
  const [retention] = useConfig("statRetention");
  const [green] = useToken("colors", ["green.500"]);

  return (
    <VictoryChart
      width={1000}
      height={200}
      padding={{ top: 20, left: 40, bottom: 40, right: 20 }}
      theme={VictoryTheme.material}
    >
      <VictoryLine
        data={stats}
        style={{
          data: {
            stroke: green,
          },
        }}
        x="time"
        y="resinsSpent"
      />

      <VictoryAxis
        tickCount={retention / 2}
        tickFormat={(value) => {
          const time = DateTime.fromMillis(value);
          return `${time.month}/${time.day}`;
        }}
      />

      <VictoryAxis
        dependentAxis
        domain={{
          y: [0, ResinsPerDay],
        }}
      />
    </VictoryChart>
  );
};

export default memo(ResinStats);
