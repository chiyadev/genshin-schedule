import React, { memo } from "react";
import WhiteCard from "../WhiteCard";
import { chakra, Heading, HStack, Icon, StackDivider, useToken, VStack } from "@chakra-ui/react";
import { FaClipboardCheck } from "react-icons/fa";
import { StatFrame, useConfig, useCurrentStats } from "../../utils/configs";
import { DateTime } from "luxon";
import { useEfficiencyColor } from "./color";
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from "victory";

const TaskStats = () => {
  return (
    <VStack align="stretch" spacing={4}>
      <HStack spacing={2} color="white" fontSize="xl" fontWeight="bold">
        <Icon as={FaClipboardCheck} w={8} fontSize="2xl" />
        <div>Tasks done</div>
      </HStack>

      <WhiteCard divide>
        <HStack align="stretch" spacing={0} divider={<StackDivider orientation="vertical" borderColor="gray.200" />}>
          <TodayPanel />
          <TotalPanel />
          <PeakPanel />
        </HStack>

        <TaskGraph />
      </WhiteCard>
    </VStack>
  );
};

function usePeakFrame(stats: StatFrame[]) {
  let peak: StatFrame | undefined;

  for (const frame of stats) {
    if (!frame.tasksDone) {
      continue;
    }

    if (peak) {
      frame.tasksDone >= peak.tasksDone && (peak = frame);
    } else {
      peak = frame;
    }
  }

  return peak;
}

const TodayPanel = () => {
  const [stats] = useCurrentStats();
  const value = stats?.tasksDone || 0;
  const peak = usePeakFrame(useConfig("stats")[0]);
  const color = useEfficiencyColor(peak ? value / peak.tasksDone : 0);

  return (
    <VStack flex={1} spacing={2}>
      <div>Today</div>
      <Heading color={color}>{value}</Heading>
    </VStack>
  );
};

const TotalPanel = () => {
  const [stats] = useConfig("stats");
  const value = stats.reduce((total, { tasksDone }) => total + tasksDone, 0);
  const color = useEfficiencyColor(value ? 1 : 0); // todo: algorithm to calculate total efficiency

  return (
    <VStack flex={1} spacing={2}>
      <div>Total</div>
      <Heading color={color}>{value}</Heading>
    </VStack>
  );
};

const PeakPanel = () => {
  const [stats] = useConfig("stats");
  const peak = usePeakFrame(stats);
  const value = peak?.tasksDone || 0;
  const color = useEfficiencyColor(peak ? 1 : 0);

  return (
    <VStack flex={1} spacing={2}>
      <div>Peak</div>
      <Heading color={color}>{value}</Heading>

      <chakra.div fontSize="sm" color="gray.500">
        {peak ? DateTime.fromMillis(peak.time).toLocaleString() : "never"}
      </chakra.div>
    </VStack>
  );
};

const TaskGraph = () => {
  const [stats] = useConfig("stats");
  const [retention] = useConfig("statRetention");
  const peak = usePeakFrame(stats);
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
        y="tasksDone"
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
        tickCount={4}
        domain={{
          y: [0, Math.max(8, peak?.tasksDone || 0)],
        }}
      />
    </VictoryChart>
  );
};

export default memo(TaskStats);
