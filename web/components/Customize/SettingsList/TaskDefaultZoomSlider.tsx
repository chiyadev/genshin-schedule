import React, { memo, useState } from "react";
import {
  HStack,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stat,
  StatLabel,
  StatNumber,
  Tooltip,
} from "@chakra-ui/react";
import { MapZoomMax, MapZoomMin, useConfig } from "../../../utils/config";
import { FormattedMessage } from "react-intl";
import { ZoomIn } from "react-feather";

const TaskDefaultZoomSlider = () => {
  const [hint, setHint] = useState(false);
  const [value, setValue] = useConfig("mapTaskDefaultZoom");

  return (
    <Stat>
      <StatLabel>
        <HStack spacing={2}>
          <Icon as={ZoomIn} />
          <div>
            <FormattedMessage defaultMessage="Zoom on task focus" />
          </div>
        </HStack>
      </StatLabel>

      <StatNumber>
        <Tooltip label={<span>{value}x</span>} isOpen={hint} placement="top">
          <div>
            <Slider
              w="sm"
              maxW="full"
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
          </div>
        </Tooltip>
      </StatNumber>
    </Stat>
  );
};

export default memo(TaskDefaultZoomSlider);
