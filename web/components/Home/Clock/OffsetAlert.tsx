import { Flex, Link } from "@chakra-ui/react";
import React, { memo } from "react";
import { useConfig } from "../../../utils/configs";
import { trackEvent } from "../../../utils/umami";
import pluralize from "pluralize";

const OffsetAlert = () => {
  const [offset, setOffset] = useConfig("offsetDays");

  if (!offset) {
    return null;
  }

  return (
    <Flex justify="center">
      <Link
        as="button"
        color="red.500"
        fontSize="sm"
        fontWeight="bold"
        onClick={() => {
          setOffset(0);
          trackEvent("clock", "offsetReset");
        }}
      >
        Showing schedule in {offset >= 0 ? "+" : "-"}
        {Math.abs(offset)} {pluralize("day", offset)}
      </Link>
    </Flex>
  );
};

export default memo(OffsetAlert);
