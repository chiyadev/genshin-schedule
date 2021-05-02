import { Button, Icon, Input, InputGroup, InputLeftAddon, useClipboard } from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import { createApiClient } from "../../../utils/api";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage, useIntl } from "react-intl";

const MessageDisplay = () => {
  const { formatMessage } = useIntl();
  const [message, setMessage] = useState("");
  const { onCopy, hasCopied } = useClipboard(message);

  // don't return token in html, read using js
  useEffect(() => {
    const client = createApiClient();

    if (client.authenticated) {
      setMessage(`enable ||${client.token}||`);
    } else {
      setMessage(formatMessage({ id: "notSignedIn" }));
    }
  }, []);

  return (
    <InputGroup>
      <InputLeftAddon
        as={Button}
        leftIcon={<Icon as={hasCopied ? FaCheck : FaCopy} />}
        onClick={() => {
          onCopy();
          trackEvent("notifications", "tokenCopy");
        }}
      >
        {hasCopied ? <FormattedMessage id="copied" /> : <FormattedMessage id="copy" />}
      </InputLeftAddon>

      <Input disabled value={message} />
    </InputGroup>
  );
};

export default memo(MessageDisplay);
