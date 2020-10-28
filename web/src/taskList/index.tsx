import React, { memo } from "react";
import WhiteCard from "../whiteCard";
import { useDueTasks } from "../utils";
import Item from "./item";

const TaskListCard = () => {
  const tasks = useDueTasks();

  return (
    <WhiteCard divide>
      {tasks.map((task) => (
        <Item key={task.id} task={task} />
      ))}
    </WhiteCard>
  );
};

export default memo(TaskListCard);
