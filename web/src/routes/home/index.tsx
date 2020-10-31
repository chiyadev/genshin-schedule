import React, { memo } from "react";
import { useTabTitle } from "../../utils";
import DomainList from "./domain";
import TaskList from "./tasks";
import Info from "./info";
import Map from "./map";
import ResinCalculator from "./resin";
import Clock from "./clock";
import Sync from "./sync";

const Home = () => {
  useTabTitle();

  return (
    <div className="container mx-auto p-4 space-y-12">
      <Clock />
      <Info />
      <Sync />
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
