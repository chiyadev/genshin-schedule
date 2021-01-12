import React, { memo } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { setAuthToken } from "../../../utils/api";
import { trackEvent } from "../../../utils/umami";
import { useRouter } from "next/router";

const SignOutButton = () => {
  const router = useRouter();

  return (
    <Button
      leftIcon={<Icon as={FaSignOutAlt} />}
      onClick={() => {
        setAuthToken(undefined);
        trackEvent("sync", "disable");

        setTimeout(() => router.push("/"));
      }}
    >
      Sign out
    </Button>
  );
};

export default memo(SignOutButton);
