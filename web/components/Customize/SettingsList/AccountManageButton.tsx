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
import { FaUpload, FaUserEdit } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { useRouter } from "next/router";
import { createApiClient, setAuthToken, User } from "../../../utils/api";
import { FormattedMessage, useIntl } from "react-intl";

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
        leftIcon={<Icon as={FaUserEdit} />}
        onClick={() => {
          setOpen(true);
          trackEvent("accountManager", "show");
        }}
      >
        <FormattedMessage id="manageAccount" />
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FormattedMessage id="manageAccount" />
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
                <div>
                  <FormattedMessage id="manageUsnPwd" />
                </div>

                <FormControl isRequired>
                  <FormLabel>
                    <FormattedMessage id="username" />
                  </FormLabel>

                  <Input
                    id="username"
                    placeholder={formatMessage({ id: "usernameNew" })}
                    autoComplete="username"
                    value={username}
                    onChange={({ currentTarget: { value } }) => setUsername(value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>
                    <FormattedMessage id="password" />
                  </FormLabel>

                  <Input
                    id="password"
                    type="password"
                    placeholder={formatMessage({ id: "passwordNew" })}
                    autoComplete="current-password"
                    value={password}
                    onChange={({ currentTarget: { value } }) => setPassword(value)}
                  />
                </FormControl>

                <div>
                  <FormattedMessage id="linkedDiscordId" />: <Code>{user.discordUserId ?? "<null>"}</Code>
                </div>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <ButtonGroup>
                <Button type="submit" colorScheme="red" leftIcon={<Icon as={FaUpload} />} isLoading={load}>
                  <FormattedMessage id="manageAccountSubmit" />
                </Button>

                <Button onClick={() => setOpen(false)}>
                  <FormattedMessage id="cancel" />
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
