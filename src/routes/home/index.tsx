import { h } from "preact";

import Time from "./time";
import ResinCalculator from "./resinCalc";
import DomainList from "./domainList";
import { useTabTitle } from "../../utils";

const Home = () => {
  useTabTitle();

  return (
    <div className="container mx-auto p-4 space-y-12">
      <Time />
      <ResinCalculator />
      <DomainList />
    </div>
  );
};

export default Home;
