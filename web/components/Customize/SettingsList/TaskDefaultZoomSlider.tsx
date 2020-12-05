import React, { memo, useState } from "react";
import { chakra, HStack, Icon, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Tooltip } from "@chakra-ui/react";
import { MapZoomMax, MapZoomMin, useConfig } from "../../../utils/configs";
import { FaSearchPlus } from "react-icons/fa";

const TaskDefaultZoomSlider = () => {
  const [hint, setHint] = useState(false);
  const [value, setValue] = useConfig("mapTaskDefaultZoom");

  return (
    <HStack w="full" spacing={4}>
      <HStack spacing={2}>
        <Icon as={FaSearchPlus} />
        <div>Zoom on task focus</div>
      </HStack>

      <Tooltip label={<span>{value}x</span>} isOpen={hint} placement="top">
        <chakra.div w="full" maxW="xs">
          <Slider
            value={value * 10}
            min={MapZoomMin * 10}
            max={MapZoomMax * 10}
            onChange={(v) => setValue(v / 10)}
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

export default memo(TaskDefaultZoomSlider);
