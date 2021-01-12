import React, { memo, useState } from "react";
import {
  Button,
  ButtonGroup,
  chakra,
  FormControl,
  FormLabel,
  Icon,
  Input,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaUpload, FaUserEdit } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { useRouter } from "next/router";
import { createApiClient, setAuthToken, User } from "../../../utils/api";

const AccountManageButton = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useToast();

  return (
    <>
      <Button
        leftIcon={<Icon as={FaUserEdit} />}
        onClick={() => {
          setOpen(true);
          trackEvent("accountManager", "show");
        }}
      >
        Manage account
      </Button>

      <LightMode>
        <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Manage account</ModalHeader>
            <ModalCloseButton />

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoad(true);

                try {
                  const client = createApiClient();

                  const { token } = await client.updateAuth({
                    username,
                    password,
                  });

                  setAuthToken(undefined, token);
                  trackEvent("accountManager", "updateAuth");

                  setTimeout(() => router.reload());
                } catch (e) {
                  toast({
                    position: "top-right",
                    status: "error",
                    title: "Error",
                    description: e.message,
                    isClosable: true,
                  });
                } finally {
                  setLoad(false);
                }
              }}
            >
              <ModalBody>
                <VStack align="stretch" spacing={4}>
                  <chakra.div>You can change your account username and password.</chakra.div>

                  <FormControl isRequired>
                    <FormLabel>Username</FormLabel>

                    <Input
                      id="username"
                      placeholder="New username"
                      autoComplete="username"
                      value={username}
                      onChange={({ currentTarget: { value } }) => setUsername(value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>

                    <Input
                      id="password"
                      type="password"
                      placeholder="New password"
                      autoComplete="current-password"
                      value={password}
                      onChange={({ currentTarget: { value } }) => setPassword(value)}
                    />
                  </FormControl>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <ButtonGroup>
                  <Button type="submit" colorScheme="red" leftIcon={<Icon as={FaUpload} />} isLoading={load}>
                    Submit
                  </Button>

                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                </ButtonGroup>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </LightMode>
    </>
  );
};

export default memo(AccountManageButton);
