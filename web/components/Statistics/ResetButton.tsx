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
  LightMode,
} from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import { useConfig } from "../../utils/configs";

const ResetButton = () => {
  const [, setStats] = useConfig("stats");
  const [confirm, setConfirm] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button colorScheme="red" leftIcon={<Icon as={FaSync} />} onClick={() => setConfirm(true)}>
        Reset
      </Button>

      <LightMode>
        <AlertDialog isOpen={confirm} onClose={() => setConfirm(false)} leastDestructiveRef={cancelRef}>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Reset statistics</AlertDialogHeader>

            <AlertDialogBody>Are you sure? This action cannot be undone.</AlertDialogBody>

            <AlertDialogFooter>
              <ButtonGroup>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setStats([]);
                    setConfirm(false);
                  }}
                >
                  Proceed
                </Button>

                <Button ref={cancelRef} onClick={() => setConfirm(false)}>
                  Cancel
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </LightMode>
    </>
  );
};

export default memo(ResetButton);
