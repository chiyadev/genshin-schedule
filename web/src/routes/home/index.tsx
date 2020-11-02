import React, { memo } from "react";
import { useTabTitle } from "../../utils";
import DomainList from "./domain";
import TaskList from "./tasks";
import Info from "./info";
import ResinCalc from "./resin";
import Clock from "./clock";
import Sync from "./sync";

const Home = () => {
  useTabTitle();

  return (
    <div className="container mx-auto p-4 space-y-12">
      <Clock />
      <Info />
      <Sync />
      <ResinCalc />
      <TaskList />
      <DomainList />
    </div>
  );
};

export default memo(Home);
