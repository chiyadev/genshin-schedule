import { Task, useConfig } from "../configs";
import { h } from "preact";
import { memo } from "preact/compat";

const Item = ({ task }: { task: Task }) => {
  const [, setMapState] = useConfig("mapState");
  const [, setFocusedTask] = useConfig("mapFocusedTask");

  return (
    <div
      className="py-2 flex flex-row space-x-2 cursor-pointer"
      onClick={() => {
        setMapState({ ...task.location, zoom: 5.6 });
        setFocusedTask(task.id);
      }}
    >
      <div className="flex flex-col justify-center flex-shrink-0">
        <img
          alt={task.icon}
          src={`/assets/game/${task.icon}.png`}
          className="w-8 h-8 object-contain"
        />
      </div>

      <div className="flex flex-col justify-center">
        <div className="font-bold">{task.name}</div>

        {task.description && (
          <div className="text-xs text-gray-600">{task.description}</div>
        )}
      </div>
    </div>
  );
};

export default memo(Item);
