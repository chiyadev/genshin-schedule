import React, { memo } from "react";
import WhiteCard from "../WhiteCard";
import { chakra, Heading, HStack, StackDivider, useColorModeValue, useToken, VStack } from "@chakra-ui/react";
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
        <FormattedMessage id="statResinSpent" />
      </Heading>

      <WhiteCard divide>
        <HStack
          align="stretch"
          spacing={0}
          divider={<StackDivider orientation="vertical" borderColor={useColorModeValue("gray.200", "gray.700")} />}
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
    <VStack flex={1} spacing={2}>
      <div>
        <FormattedMessage id="today" />
      </div>
      <Heading color={color}>{value}</Heading>
    </VStack>
  );
};

const TotalPanel = () => {
  const [stats] = useConfig("stats");
  const [retention] = useConfig("statRetention");
  const value = stats.reduce((total, { resinsSpent }) => total + resinsSpent, 0);
  const color = useEfficiencyColor(value / (ResinsPerDay * retention));

  return (
    <VStack flex={1} spacing={2}>
      <div>
        <FormattedMessage id="total" />
      </div>
      <Heading color={color}>{value}</Heading>

      <chakra.div fontSize="sm" color="gray.500">
        <FormattedMessage
          id="statEfficiency"
          values={{ percent: Math.round((value / (ResinsPerDay * retention)) * 100) }}
        />
      </chakra.div>
    </VStack>
  );
};

const PeakPanel = () => {
  const [stats] = useConfig("stats");
  const peak = usePeakFrame(stats);
  const value = peak?.resinsSpent || 0;
  const color = useEfficiencyColor(value / ResinsPerDay);

  return (
    <VStack flex={1} spacing={2}>
      <div>
        <FormattedMessage id="peak" />
      </div>
      <Heading color={color}>{value}</Heading>

      <chakra.div fontSize="sm" color="gray.500">
        {peak ? DateTime.fromMillis(peak.time).toLocaleString() : <FormattedMessage id="statNever" />}
      </chakra.div>
    </VStack>
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
