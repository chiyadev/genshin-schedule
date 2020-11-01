import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../../configs";
import { FaEye } from "react-icons/fa";
import { useLeaflet } from "react-leaflet";
import { trackEvent } from "../../../track";

const HideCheck = ({
  task,
  setTask,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
}) => {
  const leaflet = useLeaflet();

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

          checked && leaflet.map?.closePopup();

          trackEvent("map", "taskToggleHide");
        }}
      />
    </label>
  );
};

export default memo(HideCheck);
