import React, { memo, useState } from "react";
import {
  Button,
  ButtonGroup,
  Code,
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
import { trackEvent } from "../../../utils/umami";
import { useRouter } from "next/router";
import { createApiClient, setAuthToken, User } from "../../../utils/api";
import { FormattedMessage, useIntl } from "react-intl";
import { Upload, User as UserIcon } from "react-feather";

const AccountManageButton = ({ user }: { user: User }) => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useToast();

  return (
    <>
      <Button
        leftIcon={<Icon as={UserIcon} />}
        onClick={() => {
          setOpen(true);
          trackEvent("accountManager", "show");
        }}
      >
        <FormattedMessage defaultMessage="Manage account" />
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FormattedMessage defaultMessage="Manage account" />
          </ModalHeader>
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
                <div>
                  <FormattedMessage defaultMessage="You can change your account username and password." />
                </div>

                <FormControl isRequired>
                  <FormLabel>
                    <FormattedMessage defaultMessage="Username" />
                  </FormLabel>

                  <Input
                    id="username"
                    placeholder={formatMessage({ defaultMessage: "New username" })}
                    autoComplete="username"
                    value={username}
                    onChange={({ currentTarget: { value } }) => setUsername(value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>
                    <FormattedMessage defaultMessage="Password" />
                  </FormLabel>

                  <Input
                    id="password"
                    type="password"
                    placeholder={formatMessage({ defaultMessage: "New password" })}
                    autoComplete="current-password"
                    value={password}
                    onChange={({ currentTarget: { value } }) => setPassword(value)}
                  />
                </FormControl>

                <div>
                  <FormattedMessage defaultMessage="Linked Discord ID" />: <Code>{user.discordUserId ?? "<null>"}</Code>
                </div>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <ButtonGroup>
                <Button type="submit" colorScheme="red" leftIcon={<Icon as={Upload} />} isLoading={load}>
                  <FormattedMessage defaultMessage="Submit" />
                </Button>

                <Button onClick={() => setOpen(false)}>
                  <FormattedMessage defaultMessage="Cancel" />
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(AccountManageButton);
