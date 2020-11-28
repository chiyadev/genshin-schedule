import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../../../utils/configs";
import { FaEye } from "react-icons/fa";
import { trackEvent } from "../../../../utils/umami";
import { useMap } from "react-leaflet";
import { Checkbox, HStack, Icon, Spacer } from "@chakra-ui/react";

const HideCheck = ({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) => {
  const map = useMap();

  return (
    <HStack spacing={2}>
      <Icon as={FaEye} />

      <HStack as="label" spacing={2} cursor="pointer" flex={1}>
        <div>Hide temporarily</div>

        <Spacer />

        <Checkbox
          size="sm"
          isChecked={!task.visible}
          onChange={({ currentTarget: { checked } }) => {
            setTask((task) => ({ ...task, visible: !checked }));

            checked && map.closePopup();
            trackEvent("map", "taskToggleHide");
          }}
        />
      </HStack>
    </HStack>
  );
};

export default memo(HideCheck);
