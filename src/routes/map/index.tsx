import MapControl from "../../map";
import { h } from "preact";
import { css, cx } from "emotion";
import Header from "../../header";
import { useState } from "preact/hooks";
import { useTabTitle } from "../../utils";
import { memo } from "preact/compat";
import TaskListCard, { useCurrentTasks } from "../../taskListCard";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useConfig } from "../../configs";

const Map = () => {
  useTabTitle("Map");

  return (
    <div className="w-full h-screen">
      <HeaderWrapper />
      <TaskList />

      <MapControl
        className={cx(
          "w-full h-full",
          css`
            z-index: 0 !important;
            background: #2e313d !important;
          `
        )}
      />
    </div>
  );
};

const HeaderWrapper = () => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={cx(
        "absolute w-full top-0 z-10",
        { "opacity-50": !hover },
        css`
          background: ${hover
            ? "#2e313d"
            : "linear-gradient(rgba(46, 49, 61, 1) 0%, rgba(255, 255, 255, 0) 100%)"};
        `
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Header />
    </div>
  );
};

const TaskList = () => {
  const tasks = useCurrentTasks();
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useConfig("mapTaskList");

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
      </div>

      {visible && (
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

export default memo(Map);
