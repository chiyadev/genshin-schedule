import React, { memo, useEffect, useState } from "react";
import Submit from "./Submit";
import { chakra, FormControl, FormLabel, Input, Link, VStack } from "@chakra-ui/react";

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
        <Submit username={username} password={password} setError={setError} />

        <chakra.div fontSize="sm">
          {error ? (
            <chakra.span color="red.500">Error: {error.message}</chakra.span>
          ) : (
            <chakra.span color="gray.500">
              * Never reuse your miHoYo password on Genshin-related websites.{" "}
              <Link
                color="blue.500"
                href="https://github.com/chiyadev/genshin-schedule/wiki/Regarding-miHoYo-account-security"
                isExternal
              >
                Read more.
              </Link>
            </chakra.span>
          )}
        </chakra.div>
      </VStack>
    </VStack>
  );
};

export default memo(Content);
