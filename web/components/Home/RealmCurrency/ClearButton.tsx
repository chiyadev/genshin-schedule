import React, { memo } from "react";
import { useConfig } from "../../../utils/config";
import { useServerTime } from "../../../utils/time";
import { Button } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

const ClearButton = () => {
  const time = useServerTime(1000);
  const [, setValue] = useConfig("realmCurrency");

  return (
    <Button
      variant="ghost"
      color="gray.500"
      size="sm"
      onClick={() => {
        setValue({
          value: 0,
          time: time.valueOf(),
        });
      }}
    >
      <FormattedMessage defaultMessage="Clear" />
    </Button>
  );
};

export default memo(ClearButton);
