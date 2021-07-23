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
import { useConfig } from "../../../utils/config";
import { ResinCap } from "../../../db/resins";
import NotificationSetter from "../../Home/Resin/NotificationSetter";
import { FormattedMessage } from "react-intl";
import { Bell } from "react-feather";

const ResinNotifyMarkSlider = () => {
  const [hint, setHint] = useState(false);
  const [value, setValue] = useConfig("resinNotifyMark");

  return (
    <Stat>
      <NotificationSetter />

      <StatLabel>
        <HStack spacing={2}>
          <Icon as={Bell} />
          <div>
            <FormattedMessage defaultMessage="Send resin notification at" />
          </div>
        </HStack>
      </StatLabel>

      <StatNumber>
        <Tooltip label={<span>{value} resins</span>} isOpen={hint} placement="top">
          <div>
            <Slider
              w="sm"
              maxW="full"
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
          </div>
        </Tooltip>
      </StatNumber>
    </Stat>
  );
};

export default memo(ResinNotifyMarkSlider);
