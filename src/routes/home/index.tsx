import { h } from "preact";
import { useTabTitle } from "../../utils";
import Time from "./time";
import ResinCalculator from "./resinCalc";
import DomainList from "./domainList";
import TaskList from "./taskList";

const Home = () => {
  useTabTitle();

  return (
    <div className="container mx-auto p-4 space-y-12">
      <Time />
      <ResinCalculator />
      <TaskList />
      <DomainList />
    </div>
  );
};

export default Home;
