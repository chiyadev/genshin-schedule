import React, {
  ComponentProps,
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Task, useConfig } from "../../configs";
import L from "leaflet";
import CardPopup from "../popup";
import { cx } from "emotion";
import MarkerWrapper from "./markerWrapper";
import Back from "./back";
import InfoPage from "./info";
import IconPage from "./icon";
import { getGameImageSrc } from "../../gameImage";

import "./icon.css";

export type PopupPage = "info" | "icon";
export const PopupPages: PopupPage[] = ["info", "icon"];

const TaskMarker = (props: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  alwaysOpen?: boolean;
  showDue?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  footer?: ReactNode;
}) => {
  const { task } = props;
  const [icon, setIcon] = useState<L.Icon>();

  useEffect(() => {
    (async () => {
      try {
        setIcon(
          new L.Icon({
            iconUrl: await getGameImageSrc(task.icon),
            iconSize: [36, 36],
            className: "task-icon",
          })
        );
      } catch {
        // ignored
      }
    })();
  }, [task.icon]);

  if (!icon) {
    return null;
  }

  return <TaskMarkerCore icon={icon} {...props} />;
};

const TaskMarkerCore = ({
  task,
  setTask,
  alwaysOpen,
  showDue = true,
  onOpen,
  onClose,
  footer,
  icon,
}: ComponentProps<typeof TaskMarker> & {
  icon: L.Icon;
}) => {
  const markerRef = useRef<any>(null);

  const [focusedTask, setFocusedTask] = useConfig("mapFocusedTask");
  const focused = focusedTask === task.id;

  useEffect(() => {
    if (alwaysOpen || focused) {
      markerRef.current?.leafletElement.openPopup();
    }
  }, [task, focused, alwaysOpen]);

  const [page, setPage] = useState<PopupPage>(PopupPages[0]);

  return (
    <MarkerWrapper
      task={task}
      markerRef={markerRef}
      position={task.location}
      icon={icon}
    >
      <CardPopup
        divide
        onOpen={() => {
          onOpen?.();
          setFocusedTask(task.id);
        }}
        onClose={() => {
          onClose?.();
          focused && setFocusedTask(false);
        }}
      >
        {useMemo(
          () =>
            page === "info" ? (
              <InfoPage
                task={task}
                setTask={setTask}
                setPage={setPage}
                autoFocus={alwaysOpen}
                showDue={showDue}
              />
            ) : page === "icon" ? (
              <IconPage setTask={setTask} setPage={setPage} />
            ) : null,
          [alwaysOpen, page, setTask, showDue, task]
        )}

        <div
          className={cx("py-2 space-x-2 text-xs flex flex-row", {
            "justify-end": page === "info",
          })}
        >
          {page === "info" ? footer : <Back setPage={setPage} />}
        </div>
      </CardPopup>
    </MarkerWrapper>
  );
};

export default memo(TaskMarker);
