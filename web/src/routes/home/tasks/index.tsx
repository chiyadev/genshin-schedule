import React, { memo } from "react";
import Heading from "../heading";
import { useDueTasks } from "../../../utils";
import { useConfig } from "../../../configs";
import TaskListCard from "../../../taskList";
import MarkAllDone from "./markAllDone";
import { FaAngleRight, FaTimes } from "react-icons/fa";
import MapCore from "../../../map";
import { css, cx } from "emotion";
import { Link } from "react-router-dom";

const TaskList = () => {
  const tasks = useDueTasks();
  const [hidden] = useConfig("hiddenWidgets");

  return (
    <div className="space-y-4">
      <Heading type="tasks">
        Today&apos;s Tasks{tasks.length !== 0 && <span> ({tasks.length})</span>}
      </Heading>

      {!hidden.tasks && (
        <div className="space-y-4">
          {tasks.length ? (
            <div className="space-y-1">
              <TaskListCard />

              <div className="text-right text-xs">
                <MarkAllDone />
              </div>
            </div>
          ) : (
            <div className="text-sm">
              <FaTimes className="inline" />
              <span className="align-middle">
                {" "}
                No tasks for now. Create one by clicking on the map.
              </span>
            </div>
          )}

          <div className="space-y-1">
            <MapCore
              minimal
              className={cx(
                "w-full rounded shadow-lg",
                css`
                  height: 26rem;
                  background: rgba(0, 0, 0, 0.1) !important;
                `
              )}
            />

            <div className="text-right text-xs">
              <Link to="/map">
                <span className="align-middle">Open map</span>
                <FaAngleRight className="inline" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(TaskList);
