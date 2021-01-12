import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  chakra,
  Icon,
  LightMode,
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
import { FaCheck, FaCode, FaCopy, FaPencilAlt } from "react-icons/fa";
import { useConfigs } from "../../../utils/configs";
import { trackEvent } from "../../../utils/umami";

const ConfigExportButton = () => {
  const [open, setOpen] = useState(false);
  const [configs, setConfigs] = useConfigs();
  const configsString = useMemo(() => JSON.stringify(configs, null, 2), [configs]);
  const [data, setData] = useState(configsString);
  const { onCopy, hasCopied } = useClipboard(data);
  const toast = useToast();

  useEffect(() => setData(configsString), [configsString]);

  return (
    <>
      <Button
        leftIcon={<Icon as={FaCode} />}
        onClick={() => {
          setOpen(true);
          trackEvent("dataManager", "show");
        }}
      >
        Manage data
      </Button>

      <LightMode>
        <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Manage data</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack align="stretch" spacing={4}>
                <Alert status="warning">
                  <AlertIcon />
                  Input is not validated. Corrupted input can make data recovery impossible.
                </Alert>

                <chakra.div>
                  You can export your account data for backup and restore.
                  <strong> This action cannot be undone.</strong>
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
                  leftIcon={<Icon as={FaPencilAlt} />}
                  onClick={() => {
                    try {
                      setConfigs(JSON.parse(data));
                      setOpen(false);
                    } catch (e) {
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
                  Overwrite
                </Button>

                <Button
                  leftIcon={<Icon as={hasCopied ? FaCheck : FaCopy} />}
                  onClick={() => {
                    onCopy();
                    trackEvent("dataManager", "copy");
                  }}
                >
                  {hasCopied ? "Copied" : "Copy"}
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </LightMode>
    </>
  );
};

export default memo(ConfigExportButton);
