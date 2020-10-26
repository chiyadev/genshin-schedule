import { Marker, MarkerProps } from "react-leaflet";
import { Task } from "../../configs";
import { h, Ref } from "preact";
import { useServerDate } from "../../time";
import { memo } from "preact/compat";

const MarkerWrapper = ({
  task,
  markerRef,
  ...props
}: MarkerProps & {
  task: Task;
  markerRef?: Ref<typeof Marker>;
}) => {
  const date = useServerDate(60000);

  return (
    <Marker
      ref={markerRef}
      opacity={task.dueTime <= date.getTime() ? 1 : 0.5}
      {...props}
    />
  );
};

export default memo(MarkerWrapper);
