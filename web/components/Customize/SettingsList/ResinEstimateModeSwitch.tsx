import React, { memo } from "react";
import { chakra, HStack, Icon, Select } from "@chakra-ui/react";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";

const ResinEstimateModeSwitch = () => {
    const [value, setValue] = useConfig("resinEstimateMode");

    return (
        <HStack w="full" spacing={4}>
            <HStack spacing={2}>
                <Icon as={FaSortAmountDownAlt} />
                <div>Resin estimate mode</div>
            </HStack>

            <chakra.div w="full" maxW="xs">
                <Select
                    value={value}
                    onChange={({ currentTarget: { value } }) => {
                        setValue(value as any);
                        trackEvent("resinEstimateMode", value);
                    }}
                >
                    <option value="value">Show value steps (20, 40, 80, ...)</option>
                    <option value="time">Show time steps (2h, 4h, 8h, ...)</option>
                </Select>
            </chakra.div>
        </HStack>
    );
};

export default memo(ResinEstimateModeSwitch);
