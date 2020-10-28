import React, { memo } from "react";
import { FaTimes } from "react-icons/fa";
import SectionHeading from "../sectionHeading";
import TaskListCard from "../../../taskList";
import MarkAllDone from "./markAllDone";
import { useDueTasks } from "../../../utils";

const TaskList = () => {
  const tasks = useDueTasks();

  return (
    <div className="space-y-4">
      <SectionHeading>
        Today&apos;s Tasks{tasks.length !== 0 && <span> ({tasks.length})</span>}
      </SectionHeading>

      {tasks.length ? (
        <div className="space-y-1">
          <TaskListCard />

          <div className="text-right text-xs">
            <MarkAllDone />
          </div>
        </div>
      ) : (
        <div className="text-sm">
          <FaTimes className="inline" /> No tasks for now. Create one by
          clicking on the map.
        </div>
      )}
    </div>
  );
};

export default memo(TaskList);
