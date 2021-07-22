import React, { memo, useState } from "react";
import { chakra, HStack, Icon, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Tooltip } from "@chakra-ui/react";
import { MapZoomMax, MapZoomMin, useConfig } from "../../../utils/config";
import { FormattedMessage } from "react-intl";
import { ZoomIn } from "react-feather";

const TaskDefaultZoomSlider = () => {
  const [hint, setHint] = useState(false);
  const [value, setValue] = useConfig("mapTaskDefaultZoom");

  return (
    <HStack w="full" spacing={4}>
      <HStack spacing={2}>
        <Icon as={ZoomIn} />
        <div>
          <FormattedMessage defaultMessage="Zoom on task focus" />
        </div>
      </HStack>

      <Tooltip label={<span>{value}x</span>} isOpen={hint} placement="top">
        <chakra.div w="full" maxW="xs">
          <Slider
            value={value}
            step={0.1}
            min={MapZoomMin}
            max={MapZoomMax}
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

export default memo(TaskDefaultZoomSlider);
