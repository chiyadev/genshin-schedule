import React, { memo, Ref } from "react";
import { Marker, MarkerProps } from "react-leaflet";
import { Task } from "../../../utils/config";
import { useServerTime } from "../../../utils/time";

const MarkerWrapper = ({
  task,
  markerRef,
  ...props
}: MarkerProps & {
  task: Task;
  markerRef?: Ref<any>;
}) => {
  const time = useServerTime(60000);

  return <Marker ref={markerRef} opacity={task.visible && task.dueTime <= time.valueOf() ? 1 : 0.5} {...props} />;
};

export default memo(MarkerWrapper);
