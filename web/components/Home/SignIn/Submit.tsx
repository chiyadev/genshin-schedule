import React, { Dispatch, memo, SetStateAction, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { Button, Icon } from "@chakra-ui/react";
import { createApiClient, setAuthToken } from "../../../utils/api";
import { useRouter } from "next/router";

const Submit = ({
  username,
  password,
  setError,
}: {
  username: string;
  password: string;
  setError: Dispatch<SetStateAction<Error | undefined>>;
}) => {
  const router = useRouter();
  const [load, setLoad] = useState(false);

  return (
    <Button
      type="submit"
      isLoading={load}
      colorScheme="blue"
      leftIcon={<Icon as={FaSignInAlt} />}
      disabled={load || !username || !password}
      onClick={async (e) => {
        // fixes network error on firefox: https://github.com/chiyadev/genshin-schedule/issues/8
        e.preventDefault();

        setLoad(true);

        try {
          const client = createApiClient();
          const { token } = await client.auth({ username, password });

          setAuthToken(undefined, token);
          trackEvent("sync", "enable");

          setTimeout(() => router.reload());
        } catch (e) {
          setError(e);
        } finally {
          setLoad(false);
        }
      }}
    >
      Submit
    </Button>
  );
};

export default memo(Submit);
