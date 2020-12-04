import React, { Dispatch, memo, ReactNode } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useHotkeys } from "react-hotkeys-hook";
import { Heading, HStack, Kbd, ListItem, UnorderedList, VStack } from "@chakra-ui/layout";

const ShortcutHelp = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<boolean> }) => {
  useHotkeys("k", () => setOpen(true));

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Keyboard Shortcuts</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={4}>
            <Category heading="Clock">
              <KeyHint shortcut="left">Previous day</KeyHint>
              <KeyHint shortcut="right">Next day</KeyHint>
              <KeyHint shortcut="esc">Reset offset</KeyHint>
            </Category>

            <Category heading="Tasks">
              <KeyHint shortcut="n">Focus next task</KeyHint>
              <KeyHint shortcut="d">Mark as done</KeyHint>
            </Category>

            <Category heading="Other">
              <KeyHint shortcut="k">Show keyboard shortcuts</KeyHint>
            </Category>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Category = ({ heading, children }: { heading?: ReactNode; children?: ReactNode }) => {
  return (
    <VStack align="start" spacing={2}>
      <Heading size="sm">{heading}</Heading>
      <UnorderedList pl={4}>{children}</UnorderedList>
    </VStack>
  );
};

const KeyHint = ({ children, shortcut }: { children?: ReactNode; shortcut?: ReactNode }) => {
  return (
    <ListItem>
      <HStack spacing={2} align="baseline">
        <div>{children}</div>
        <Kbd>{shortcut}</Kbd>
      </HStack>
    </ListItem>
  );
};

export default memo(ShortcutHelp);
