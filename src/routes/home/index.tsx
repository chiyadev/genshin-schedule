import { h } from "preact";
import { useTabTitle } from "../../utils";
import Time from "./time";
import ResinCalculator from "./resinCalc";
import DomainList from "./domainList";
import TaskList from "./taskList";
import Info from "./info";
import { memo } from "preact/compat";

const Home = () => {
  useTabTitle();

  return (
    <div className="container mx-auto p-4 space-y-12">
      <Time />
      <Info />
      <ResinCalculator />
      <TaskList />
      <DomainList />
    </div>
  );
};

export default memo(Home);
