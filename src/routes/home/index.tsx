import { h } from "preact";
import { useTabTitle } from "../../utils";
import Time from "./time";
import ResinCalculator from "./resinCalc";
import DomainList from "./domainList";
import TaskList from "./taskList";
import Info from "./info";
import { memo } from "preact/compat";
import Map from "./map";

const Home = () => {
  useTabTitle();

  return (
    <div className="container mx-auto p-4 space-y-12">
      <Time />
      <Info />
      <ResinCalculator />

      <div className="space-y-4">
        <TaskList />
        <Map />
      </div>

      <DomainList />
    </div>
  );
};

export default memo(Home);
