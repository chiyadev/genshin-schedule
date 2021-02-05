import React, { memo } from "react";
import { Alert, AlertIcon, Center, Link, ScaleFade, useColorModeValue } from "@chakra-ui/react";
import { useConfig } from "../utils/config";
import pluralize from "pluralize";
import { trackEvent } from "../utils/umami";

const ClockOffsetWarning = () => {
  const [offset, setOffset] = useConfig("offsetDays");

  return (
    <Center position="fixed" zIndex="popover" bottom={8} w="full">
      <ScaleFade in={!!offset} unmountOnExit>
        <Alert
          maxW="sm"
          status="warning"
          colorScheme="red"
          bg={useColorModeValue("red.100", "red.700")}
          borderRadius="md"
          boxShadow="md"
        >
          <AlertIcon />

          <div>
            <span>
              <span>Showing schedule </span>
              {offset === 1 ? (
                <span>
                  for <strong>tomorrow</strong>
                </span>
              ) : offset === -1 ? (
                <span>
                  for <strong>yesterday</strong>
                </span>
              ) : (
                <span>
                  <span>in </span>
                  <strong>
                    {offset > 0 && "+"}
                    {offset} {pluralize("day", offset)}
                  </strong>
                </span>
              )}
              <span>. </span>
            </span>

            <Link
              as="button"
              color={useColorModeValue("blue.500", "blue.300")}
              onClick={() => {
                setOffset(0);
                trackEvent("clock", "offsetReset");
              }}
            >
              Reset
            </Link>
          </div>
        </Alert>
      </ScaleFade>
    </Center>
  );
};

export default memo(ClockOffsetWarning);
