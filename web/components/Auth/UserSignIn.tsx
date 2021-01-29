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

const UserSignIn = () => {
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
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </HStack>
        </Alert>
      )}

      <FormControl>
        <FormLabel>Username</FormLabel>

        <Input
          id="username"
          placeholder="Username"
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
          placeholder="Password"
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
          Forgot password?
        </Link>

        <p>
          <span color="gray.500">Never reuse your miHoYo password on Genshin-related websites.</span>
          <span> </span>
          <Link
            color={useColorModeValue("blue.500", "blue.300")}
            href="https://github.com/chiyadev/genshin-schedule/wiki/Regarding-miHoYo-account-security"
            isExternal
          >
            Read more
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
              trackEvent("sync", "enable");

              setTimeout(() => router.push("/home"));
            } catch (e) {
              setError(e);
            } finally {
              setLoad(false);
            }
          }}
        >
          Submit
        </Button>

        <Tooltip label="All data will be stored locally on the browser.">
          <Button
            disabled={load}
            leftIcon={<Icon as={FaUser} />}
            onClick={() => {
              setAuthToken(undefined, "null");
              trackEvent("sync", "auth");

              setTimeout(() => router.push("/home"));
            }}
          >
            Continue as anonymous
          </Button>
        </Tooltip>
      </ButtonGroup>
    </VStack>
  );
};

export default memo(UserSignIn);
