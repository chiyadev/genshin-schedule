import React, { Dispatch, memo, SetStateAction, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { Button, Icon } from "@chakra-ui/react";
import { createApiClient, useAuthToken } from "../../../utils/api";
import { useConfigs } from "../../../utils/configs";
import { useSyncToken } from "../../../utils/sync";

const Submit = ({
  username,
  password,
  setError,
}: {
  username: string;
  password: string;
  setError: Dispatch<SetStateAction<Error | undefined>>;
}) => {
  const [, setConfigs] = useConfigs();
  const [, setAuthToken] = useAuthToken();
  const [, setSyncToken] = useSyncToken();
  const [load, setLoad] = useState(false);

  return (
    <Button
      type="submit"
      isLoading={load}
      variant="outline"
      colorScheme="gray"
      leftIcon={<Icon as={FaSignInAlt} />}
      disabled={load || !username || !password}
      onClick={async (e) => {
        // fixes network error on firefox: https://github.com/chiyadev/genshin-schedule/issues/8
        e.preventDefault();

        setLoad(true);

        try {
          const client = createApiClient();
          const { token: authToken } = await client.auth({ username, password });

          client.token = authToken;
          const { data, token: syncToken } = await client.getSync();

          setConfigs((configs) => ({ ...configs, ...data }));
          setAuthToken(authToken);
          setSyncToken(syncToken);
          setError(undefined);

          trackEvent("sync", "enable");
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
