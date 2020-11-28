import React, { memo } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { setAuthToken } from "../../../utils/api";
import { trackEvent } from "../../../utils/umami";
import { useRouter } from "next/router";
import { useSync } from "../../../utils/configs";

const SignOutButton = () => {
  const { enabled } = useSync();
  const router = useRouter();

  if (!enabled) {
    return null;
  }

  return (
    <Button
      leftIcon={<Icon as={FaSignOutAlt} />}
      onClick={() => {
        setAuthToken(undefined);
        trackEvent("sync", "disable");

        setTimeout(() => router.reload());
      }}
    >
      Sign out
    </Button>
  );
};

export default memo(SignOutButton);
