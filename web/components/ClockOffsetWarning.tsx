import React, { memo } from "react";
import { Alert, AlertIcon, Center, Link, ScaleFade, useColorModeValue } from "@chakra-ui/react";
import { useConfig } from "../utils/config";
import { trackEvent } from "../utils/umami";
import { FormattedMessage } from "react-intl";

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
            <FormattedMessage
              defaultMessage="Showing schedule {offset, plural, =1 {for tomorrow} =-1 {for yesterday} other {in # days}}."
              values={{ offset }}
            />{" "}
            <Link
              as="button"
              color={useColorModeValue("blue.500", "blue.300")}
              onClick={() => {
                setOffset(0);
                trackEvent("clock", "offsetReset");
              }}
            >
              <FormattedMessage defaultMessage="Reset" />
            </Link>
          </div>
        </Alert>
      </ScaleFade>
    </Center>
  );
};

export default memo(ClockOffsetWarning);
