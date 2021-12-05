import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  chakra,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useClipboard,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useConfigs } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage } from "react-intl";
import { Check, Code, Copy, Edit } from "react-feather";

const ConfigExportButton = () => {
  const [open, setOpen] = useState(false);
  const [configs, setConfigs] = useConfigs();
  const configString = useMemo(() => JSON.stringify(configs, null, 2), [configs]);
  const [data, setData] = useState(configString);
  const { onCopy, hasCopied } = useClipboard(data);
  const toast = useToast();

  useEffect(() => setData(configString), [configString]);

  return (
    <>
      <Button
        leftIcon={<Icon as={Code} />}
        onClick={() => {
          setOpen(true);
          trackEvent("dataManager", "show");
        }}
      >
        <FormattedMessage defaultMessage="Manage data" />
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FormattedMessage defaultMessage="Manage data" />
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <Alert status="warning">
                <AlertIcon />
                <FormattedMessage defaultMessage="Input is not validated. Corrupted input can make data recovery impossible." />
              </Alert>

              <chakra.div>
                <FormattedMessage defaultMessage="You can export your account data for backup and restore." />
                <strong>
                  {" "}
                  <FormattedMessage defaultMessage="This action cannot be undone." />
                </strong>
              </chakra.div>

              <code>
                <Textarea value={data} onChange={({ currentTarget: { value } }) => setData(value)} h="lg" />
              </code>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button
                colorScheme="red"
                leftIcon={<Icon as={Edit} />}
                onClick={() => {
                  try {
                    setConfigs(JSON.parse(data));
                    setOpen(false);
                  } catch {
                    toast({
                      position: "top-right",
                      status: "error",
                      title: "Error",
                      description: "Input is invalid.",
                      isClosable: true,
                    });
                  } finally {
                    trackEvent("dataManager", "overwrite");
                  }
                }}
              >
                <FormattedMessage defaultMessage="Overwrite" />
              </Button>

              <Button
                leftIcon={<Icon as={hasCopied ? Check : Copy} />}
                onClick={() => {
                  onCopy();
                  trackEvent("dataManager", "copy");
                }}
              >
                {hasCopied ? <FormattedMessage defaultMessage="Copied" /> : <FormattedMessage defaultMessage="Copy" />}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(ConfigExportButton);
