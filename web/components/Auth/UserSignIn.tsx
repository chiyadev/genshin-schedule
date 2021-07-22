import React, { memo, useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  chakra,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { createApiClient, setAuthToken } from "../../utils/api";
import { trackEvent } from "../../utils/umami";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { LogIn, UserX } from "react-feather";

const UserSignIn = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    !password && setError(undefined);
  }, [password]);

  return (
    <VStack as="form" align="stretch" spacing={4}>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <HStack spacing={2}>
            <AlertTitle>
              <FormattedMessage defaultMessage="Error" />
            </AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </HStack>
        </Alert>
      )}

      <FormControl>
        <FormLabel>Username</FormLabel>

        <Input
          id="username"
          placeholder={formatMessage({ defaultMessage: "Username" })}
          autoComplete="username"
          value={username}
          onChange={({ currentTarget: { value } }) => setUsername(value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Password</FormLabel>

        <Input
          id="password"
          type="password"
          placeholder={formatMessage({ defaultMessage: "Password" })}
          autoComplete="current-password"
          value={password}
          onChange={({ currentTarget: { value } }) => setPassword(value)}
        />
      </FormControl>

      <chakra.div fontSize="sm">
        <Link
          fontSize="sm"
          color={useColorModeValue("blue.500", "blue.300")}
          href="https://github.com/chiyadev/genshin-schedule/wiki/Recovering-a-lost-account"
          isExternal
        >
          <FormattedMessage defaultMessage="Forgot password?" />
        </Link>

        <p>
          <chakra.span color="gray.500">
            <FormattedMessage defaultMessage="Never reuse your miHoYo password on Genshin-related websites." />
          </chakra.span>
          <span> </span>
          <Link
            color={useColorModeValue("blue.500", "blue.300")}
            href="https://github.com/chiyadev/genshin-schedule/wiki/Regarding-miHoYo-account-security"
            isExternal
          >
            <FormattedMessage defaultMessage="Read more." />
          </Link>
        </p>
      </chakra.div>

      <ButtonGroup>
        <Button
          type="submit"
          isLoading={load}
          colorScheme="blue"
          leftIcon={<Icon as={LogIn} />}
          disabled={load || !username || !password}
          onClick={async (e) => {
            // fixes network error on firefox: https://github.com/chiyadev/genshin-schedule/issues/8
            e.preventDefault();

            setLoad(true);

            try {
              const client = createApiClient();
              const { token } = await client.auth({ username, password });

              setAuthToken(undefined, token);
              trackEvent("auth", "signIn");

              setTimeout(() => router.push("/home"));
            } catch (e) {
              setError(e);
            } finally {
              setLoad(false);
            }
          }}
        >
          <FormattedMessage defaultMessage="Submit" />
        </Button>

        <Tooltip
          label={<FormattedMessage defaultMessage="All data will be stored locally on the browser." />}
          closeOnClick={false}
        >
          <Button
            disabled={load}
            leftIcon={<Icon as={UserX} />}
            onClick={() => {
              setAuthToken(undefined, "null");
              trackEvent("auth", "signInAnonymous");

              setTimeout(() => router.push("/home"));
            }}
          >
            <FormattedMessage defaultMessage="Continue as anonymous" />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </VStack>
  );
};

export default memo(UserSignIn);
