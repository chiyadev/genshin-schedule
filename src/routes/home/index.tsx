import { h } from "preact";

import Time from "./time";
import ResinCalculator from "./resinCalc";
import DomainList from "./domainList";

const Home = () => {
  return (
    <div className="container mx-auto p-4 space-y-12">
      <Time />
      <ResinCalculator />
      <DomainList />
    </div>
  );
};

export default Home;
