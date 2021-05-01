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
import { FaCheck, FaCode, FaCopy, FaPencilAlt } from "react-icons/fa";
import { useConfigs } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage } from "react-intl";

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
        leftIcon={<Icon as={FaCode} />}
        onClick={() => {
          setOpen(true);
          trackEvent("dataManager", "show");
        }}
      >
        <FormattedMessage id="manageData" />
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FormattedMessage id="manageData" />
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <Alert status="warning">
                <AlertIcon />
                <FormattedMessage id="manageDataValidationWarning" />
              </Alert>

              <chakra.div>
                <FormattedMessage id="manageDataHelp" />
                <strong>
                  {" "}
                  <FormattedMessage id="actionPermanent" />
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
                <FormattedMessage id="overwrite" />
              </Button>

              <Button
                leftIcon={<Icon as={hasCopied ? FaCheck : FaCopy} />}
                onClick={() => {
                  onCopy();
                  trackEvent("dataManager", "copy");
                }}
              >
                {hasCopied ? <FormattedMessage id="copied" /> : <FormattedMessage id="copy" />}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(ConfigExportButton);
