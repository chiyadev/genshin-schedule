import { memo, useEffect } from "react";
import { useServerTime } from "../../utils/time";
import { getStatFrameTime, StatFrame, useConfig } from "../../utils/config";

const StatisticsUpdater = () => {
  const time = useServerTime(60000);
  const todayId = getStatFrameTime(time).toSQLDate();
  const [stats, setStats] = useConfig("stats");
  const [retention] = useConfig("statRetention");

  useEffect(() => {
    setStats((stats) => {
      const today = getStatFrameTime(time);
      const result: StatFrame[] = [];

      for (let i = -retention; i <= 0; i++) {
        const time = today.plus({ days: i });
        const frameId = time.toSQLDate();
        const frame = stats.find((stat) => stat.id === frameId);

        result.push(
          frame || {
            id: frameId,
            time: time.valueOf(),
            resinsSpent: 0,
            tasksDone: 0,
          }
        );
      }

      return result;
    });
  }, [todayId, stats.length, setStats, retention]);

  return null;
};

export default memo(StatisticsUpdater);
