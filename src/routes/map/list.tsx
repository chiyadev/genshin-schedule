import TaskListCard from "../../taskList";
import { useState } from "preact/hooks";
import { useConfig } from "../../configs";
import { css, cx } from "emotion";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { h } from "preact";
import { memo } from "preact/compat";
import { useDueTasks } from "../../utils";

const ListOverlay = () => {
  const tasks = useDueTasks();
  const [hover, setHover] = useState(false);
  const [visible] = useConfig("mapTaskList");

  return (
    <div
      className={cx(
        "absolute max-w-xl z-10 flex flex-col space-y-1",
        { "opacity-25": !hover },
        css`
          bottom: 0.5rem;
          left: 0.5rem;
          right: 0.5rem;
        `
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="text-xs flex flex-row">
        <Toggle />
      </div>

      {visible && tasks.length !== 0 && (
        <div
          className={cx(
            "overflow-y-auto rounded",
            css`
              max-height: 10rem;
            `
          )}
        >
          <TaskListCard />
        </div>
      )}
    </div>
  );
};

const Toggle = () => {
  const tasks = useDueTasks();
  const [visible, setVisible] = useConfig("mapTaskList");

  return (
    <div className="cursor-pointer" onClick={() => setVisible(v => !v)}>
      {visible ? (
        <FaAngleDown className="inline" />
      ) : (
        <FaAngleUp className="inline" />
      )}

      <span className="align-middle">
        {visible ? "Hide" : "Show"} list ({tasks.length})
      </span>
    </div>
  );
};

export default memo(ListOverlay);
