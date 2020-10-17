import { h } from "preact";
import Time from "./time";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Time />
      </div>

      <h1>Home</h1>
      <p>This is the Home component.</p>
    </div>
  );
};

export default Home;
