import React, { memo } from "react";
import { Alert, AlertIcon, AlertTitle, VStack } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

const LeakedWarning = () => (
  <Alert status="warning" borderRadius="md">
    <AlertIcon />
    <VStack align="stretch" spacing={0}>
      <AlertTitle>
        <FormattedMessage defaultMessage="This page may be inaccurate." />
      </AlertTitle>
      <div>
        <FormattedMessage defaultMessage="The following information is based on leaked data from beta versions of the game. Take it with a grain of salt." />
      </div>
    </VStack>
  </Alert>
);

export default memo(LeakedWarning);
