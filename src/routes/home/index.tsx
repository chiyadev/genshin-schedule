import { h } from "preact";
import Time from "./time";
import DomainList from "./domainList";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-12">
        <Time />
      </div>

      <DomainList />
    </div>
  );
};

export default Home;
