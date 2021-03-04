import React, { memo } from "react";
import { HStack, Icon, Switch } from "@chakra-ui/react";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";

const ResinEstimateModeSwitch = () => {
    const [value, setValue] = useConfig("resinEstimateMode");

    return (
        <HStack spacing={4}>
            <HStack spacing={2}>
                <Icon as={FaSortAmountDownAlt} />
                <div>Use Resin milestones</div>
            </HStack>

            <Switch
                isChecked={value === "time"}
                onChange={({ currentTarget: { checked } }) => {
                    setValue(checked ? "time" : "value");
                    trackEvent("resinEstimateMode", checked ? "time" : "value");
                }}
            />
        </HStack>
    );
};

export default memo(ResinEstimateModeSwitch);
