import React, { memo, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Icon,
} from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import { useConfig } from "../../utils/config";
import { FormattedMessage } from "react-intl";

const ResetButton = () => {
  const [, setStats] = useConfig("stats");
  const [confirm, setConfirm] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button colorScheme="red" leftIcon={<Icon as={FaSync} />} onClick={() => setConfirm(true)}>
        <FormattedMessage defaultMessage="Reset" />
      </Button>

      <AlertDialog isOpen={confirm} onClose={() => setConfirm(false)} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Reset statistics</AlertDialogHeader>

          <AlertDialogBody>
            <FormattedMessage defaultMessage="This action cannot be undone." />
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonGroup>
              <Button
                colorScheme="red"
                onClick={() => {
                  setStats([]);
                  setConfirm(false);
                }}
              >
                <FormattedMessage defaultMessage="Reset" />
              </Button>

              <Button ref={cancelRef} onClick={() => setConfirm(false)}>
                <FormattedMessage defaultMessage="Cancel" />
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default memo(ResetButton);
