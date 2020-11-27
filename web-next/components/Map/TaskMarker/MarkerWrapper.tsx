import React, { memo, Ref } from "react";
import { Marker, MarkerProps } from "react-leaflet";
import { Task } from "../../../utils/configs";
import { useServerDate } from "../../../utils/time";

const MarkerWrapper = ({
  task,
  markerRef,
  ...props
}: MarkerProps & {
  task: Task;
  markerRef?: Ref<any>;
}) => {
  const date = useServerDate(60000);

  return <Marker ref={markerRef} opacity={task.visible && task.dueTime <= date.getTime() ? 1 : 0.5} {...props} />;
};

export default memo(MarkerWrapper);
