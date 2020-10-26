import { h } from "preact";
import { useTabTitle } from "../../utils";
import DomainList from "./domain";
import TaskList from "./tasks";
import Info from "./info";
import { memo } from "preact/compat";
import Map from "./map";
import ResinCalculator from "./resin";
import Clock from "./clock";

const Home = () => {
  useTabTitle();

  return (
    <div className="container mx-auto p-4 space-y-12">
      <Clock />
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
