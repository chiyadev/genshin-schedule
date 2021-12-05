import React, { memo, useState } from "react";
import {
  Button,
  ButtonGroup,
  chakra,
  FormControl,
  FormLabel,
  Icon,
  Input,
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
import { useRouter } from "next/router";
import { createApiClient, setAuthToken } from "../../utils/api";
import { LogIn } from "react-feather";

const DirectSignInButton = () => {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const toast = useToast();

  return (
    <>
      <Button leftIcon={<Icon as={LogIn} />} onClick={() => setOpen(true)}>
        Direct sign in
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Direct sign in</ModalHeader>
          <ModalCloseButton />

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoad(true);

              try {
                const client = createApiClient();

                const { token } = await client.authBypass({
                  username,
                });

                setAuthToken(undefined, token);
                setTimeout(() => router.push("/home"));
              } catch (e: any) {
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
                <chakra.div>Sign in as another user, bypassing the usual authentication method.</chakra.div>

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
              </VStack>
            </ModalBody>

            <ModalFooter>
              <ButtonGroup>
                <Button type="submit" colorScheme="blue" leftIcon={<Icon as={LogIn} />} isLoading={load}>
                  Sign in
                </Button>

                <Button onClick={() => setOpen(false)}>Cancel</Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(DirectSignInButton);
