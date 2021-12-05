import React, { memo, useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  chakra,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Tooltip,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { createApiClient, setAuthToken } from "../../utils/api";
import { trackEvent } from "../../utils/umami";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { Key, LogIn, User, UserX } from "react-feather";

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

      <VStack align="stretch" spacing={2}>
        <InputGroup>
          <InputLeftElement color="gray.500" pointerEvents="none">
            <Icon as={User} />
          </InputLeftElement>

          <Input
            id="username"
            variant="filled"
            placeholder={formatMessage({ defaultMessage: "Username" })}
            autoComplete="username"
            value={username}
            onChange={({ currentTarget: { value } }) => setUsername(value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement color="gray.500" pointerEvents="none">
            <Icon as={Key} />
          </InputLeftElement>

          <Input
            id="password"
            type="password"
            variant="filled"
            placeholder={formatMessage({ defaultMessage: "Password" })}
            autoComplete="current-password"
            value={password}
            onChange={({ currentTarget: { value } }) => setPassword(value)}
          />
        </InputGroup>
      </VStack>

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
          </chakra.span>{" "}
          <Link
            color={useColorModeValue("blue.500", "blue.300")}
            href="https://github.com/chiyadev/genshin-schedule/wiki/Regarding-miHoYo-account-security"
            isExternal
          >
            <FormattedMessage defaultMessage="Read more." />
          </Link>
        </p>
      </chakra.div>

      <Wrap spacing={2}>
        <WrapItem>
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
              } catch (e: any) {
                setError(e);
                setLoad(false);
              }
            }}
          >
            <FormattedMessage defaultMessage="Submit" />
          </Button>
        </WrapItem>

        <WrapItem>
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
              <FormattedMessage defaultMessage="Continue without signing in" />
            </Button>
          </Tooltip>
        </WrapItem>
      </Wrap>
    </VStack>
  );
};

export default memo(UserSignIn);
