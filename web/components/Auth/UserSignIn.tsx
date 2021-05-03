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
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { createApiClient, setAuthToken } from "../../utils/api";
import { trackEvent } from "../../utils/umami";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";

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
              <FormattedMessage id="error" />
            </AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </HStack>
        </Alert>
      )}

      <FormControl>
        <FormLabel>Username</FormLabel>

        <Input
          id="username"
          placeholder={formatMessage({ id: "username" })}
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
          placeholder={formatMessage({ id: "password" })}
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
          <FormattedMessage id="passwordForgot" />
        </Link>

        <p>
          <chakra.span color="gray.500">
            <FormattedMessage id="securityWarning" />
          </chakra.span>
          <span> </span>
          <Link
            color={useColorModeValue("blue.500", "blue.300")}
            href="https://github.com/chiyadev/genshin-schedule/wiki/Regarding-miHoYo-account-security"
            isExternal
          >
            <FormattedMessage id="securityReadMore" />
          </Link>
        </p>
      </chakra.div>

      <ButtonGroup>
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
              trackEvent("auth", "signIn");

              setTimeout(() => router.push("/home"));
            } catch (e) {
              setError(e);
            } finally {
              setLoad(false);
            }
          }}
        >
          <FormattedMessage id="loginSubmit" />
        </Button>

        <Tooltip label={<FormattedMessage id="loginAnonymousTip" />}>
          <Button
            disabled={load}
            leftIcon={<Icon as={FaUser} />}
            onClick={() => {
              setAuthToken(undefined, "null");
              trackEvent("auth", "signInAnonymous");

              setTimeout(() => router.push("/home"));
            }}
          >
            <FormattedMessage id="loginAnonymous" />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </VStack>
  );
};

export default memo(UserSignIn);
