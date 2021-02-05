import React, { memo, useState } from "react";
import { chakra, HStack, Icon, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Tooltip } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import { FaBell } from "react-icons/fa";
import { ResinCap } from "../../../db/resins";
import NotificationSetter from "../../Home/Resin/NotificationSetter";

const ResinNotifyMarkSlider = () => {
  const [hint, setHint] = useState(false);
  const [value, setValue] = useConfig("resinNotifyMark");

  return (
    <HStack w="full" spacing={4}>
      <NotificationSetter />

      <HStack spacing={2}>
        <Icon as={FaBell} />
        <div>Resin notification point</div>
      </HStack>

      <Tooltip label={<span>{value} resins</span>} isOpen={hint} placement="top">
        <chakra.div w="full" maxW="xs">
          <Slider
            value={value}
            step={10}
            min={10}
            max={ResinCap}
            onChange={setValue}
            onChangeStart={() => setHint(true)}
            onChangeEnd={() => setHint(false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </chakra.div>
      </Tooltip>
    </HStack>
  );
};

export default memo(ResinNotifyMarkSlider);
