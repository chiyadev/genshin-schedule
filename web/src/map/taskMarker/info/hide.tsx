import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../../configs";
import { FaEye } from "react-icons/fa";

const HideCheck = ({
  task,
  setTask,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
}) => {
  return (
    <label className="block text-xs flex flex-1 flex-row">
      <div className="flex-1">
        <FaEye className="inline" />
        <span> Hide temporarily</span>
      </div>

      <input
        type="checkbox"
        checked={!task.visible}
        onChange={({ currentTarget: { checked } }) => {
          setTask((task) => ({ ...task, visible: !checked }));
        }}
      />
    </label>
  );
};

export default memo(HideCheck);
