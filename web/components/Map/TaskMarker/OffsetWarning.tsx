import React, { memo } from "react";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { useConfig } from "../../../utils/configs";
import pluralize from "pluralize";

const OffsetWarning = () => {
  const [offset] = useConfig("offsetDays");

  return (
    <Alert status="warning" py={2}>
      <AlertIcon />
      Clock offset is set to {offset} {pluralize("day", offset)}.
    </Alert>
  );
};

export default memo(OffsetWarning);
