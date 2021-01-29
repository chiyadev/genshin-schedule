import React, { memo, useEffect, useState } from "react";
import Submit from "./Submit";
import { chakra, FormControl, FormLabel, Input, Link, useColorModeValue, VStack } from "@chakra-ui/react";

const Content = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Error>();

  useEffect(() => {
    !password && setError(undefined);
  }, [password]);

  return (
    <VStack as="form" align="stretch" spacing={4}>
      <div>
        Signing in allows your Genshin Schedule data including resin, tasks and domains to be synchronized across
        devices. This step is optional.
      </div>

      <FormControl maxW="md">
        <FormLabel>Username</FormLabel>

        <Input
          id="username"
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={({ currentTarget: { value } }) => setUsername(value)}
        />
      </FormControl>

      <FormControl maxW="md">
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

      <VStack align="start" spacing={2}>
        <Link
          fontSize="sm"
          color={useColorModeValue("blue.500", "blue.300")}
          href="https://github.com/chiyadev/genshin-schedule/wiki/Recovering-a-lost-account"
          isExternal
        >
          Forgot password?
        </Link>

        <Submit username={username} password={password} setError={setError} />

        <chakra.div fontSize="sm">
          {error ? (
            <chakra.div color={useColorModeValue("red.500", "red.300")}>Error: {error.message}</chakra.div>
          ) : (
            <chakra.div color="gray.500">
              <span>* Never reuse your miHoYo password on Genshin-related websites. </span>
              <Link
                color={useColorModeValue("blue.500", "blue.300")}
                href="https://github.com/chiyadev/genshin-schedule/wiki/Regarding-miHoYo-account-security"
                isExternal
              >
                Read more.
              </Link>
            </chakra.div>
          )}
        </chakra.div>
      </VStack>
    </VStack>
  );
};

export default memo(Content);
