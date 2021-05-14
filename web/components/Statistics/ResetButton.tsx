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
        <FormattedMessage id="statReset" />
      </Button>

      <AlertDialog isOpen={confirm} onClose={() => setConfirm(false)} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Reset statistics</AlertDialogHeader>

          <AlertDialogBody>
            <FormattedMessage id="actionPermanent" />
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
                <FormattedMessage id="statReset" />
              </Button>

              <Button ref={cancelRef} onClick={() => setConfirm(false)}>
                <FormattedMessage id="cancel" />
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default memo(ResetButton);
