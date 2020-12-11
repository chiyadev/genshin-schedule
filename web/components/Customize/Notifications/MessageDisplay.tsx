import { Button, Icon, Input, InputGroup, InputLeftAddon, useClipboard } from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import { getAuthToken } from "../../../utils/api";
import { trackEvent } from "../../../utils/umami";

const MessageDisplay = () => {
  const [message, setMessage] = useState("");
  const { onCopy, hasCopied } = useClipboard(message);

  // don't return token in html, read using js
  useEffect(() => {
    const token = getAuthToken();

    if (token) {
      setMessage(`enable ||${token}||`);
    } else {
      setMessage("You are not signed in yet.");
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
        {hasCopied ? "Copied" : "Copy"}
      </InputLeftAddon>

      <Input disabled value={message} />
    </InputGroup>
  );
};

export default memo(MessageDisplay);
