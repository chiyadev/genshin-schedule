import React, { Dispatch, memo, ReactNode } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useHotkeys } from "react-hotkeys-hook";
import { Heading, HStack, Kbd, ListItem, UnorderedList, VStack } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import { FormattedMessage, useIntl } from "react-intl";
import { Command } from "react-feather";

const ShortcutHelp = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<boolean> }) => {
  const { formatMessage } = useIntl();

  useHotkeys("k", (e) => {
    setOpen(true);
    e.preventDefault();
  });

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Icon as={Command} />
            <div>
              <FormattedMessage defaultMessage="Keyboard shortcuts" />
            </div>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={4}>
            <Category heading={<FormattedMessage defaultMessage="Server clock" />}>
              <KeyHint shortcut={<FormattedMessage defaultMessage="left" />}>
                <FormattedMessage defaultMessage="Previous day" />
              </KeyHint>
              <KeyHint shortcut={<FormattedMessage defaultMessage="right" />}>
                <FormattedMessage defaultMessage="Next day" />
              </KeyHint>
              <KeyHint shortcut={<FormattedMessage defaultMessage="esc" />}>
                <FormattedMessage defaultMessage="Reset offset" />
              </KeyHint>
            </Category>

            <Category heading={<FormattedMessage defaultMessage="Resin calculator" />}>
              <KeyHint>
                <FormattedMessage
                  defaultMessage="Subtract {values}"
                  values={{
                    values: (
                      <>
                        20 <Kbd>2</Kbd>, 30 <Kbd>3</Kbd>, 40 <Kbd>4</Kbd>, 60 <Kbd>6</Kbd>
                      </>
                    ),
                  }}
                />
              </KeyHint>
              <KeyHint>
                <FormattedMessage
                  defaultMessage="Add {values}"
                  values={{
                    values: (
                      <>
                        20 <Kbd>shift+2</Kbd>, 30 <Kbd>shift+3</Kbd>, 40 <Kbd>shift+4</Kbd>, 60 <Kbd>shift+6</Kbd>
                      </>
                    ),
                  }}
                />
              </KeyHint>
            </Category>

            <Category heading={<FormattedMessage defaultMessage="Task scheduler" />}>
              <KeyHint shortcut="f">
                <FormattedMessage defaultMessage="Search tasks" />
              </KeyHint>
              <KeyHint shortcut="l">
                <FormattedMessage defaultMessage="Toggle list overlay" />
              </KeyHint>
              <KeyHint shortcut="n">
                <FormattedMessage defaultMessage="Focus next task" />
              </KeyHint>
              <KeyHint shortcut={`${formatMessage({ defaultMessage: "shift" })}+n`}>
                <FormattedMessage defaultMessage="Focus previous task" />
              </KeyHint>
              <KeyHint shortcut="d">
                <FormattedMessage defaultMessage="Mark as done" />
              </KeyHint>
            </Category>

            <Category heading={<FormattedMessage defaultMessage="Other" />}>
              <KeyHint shortcut="k">
                <FormattedMessage defaultMessage="Show keyboard shortcuts" />
              </KeyHint>
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

        {typeof shortcut !== "undefined" &&
          (Array.isArray(shortcut) ? (
            shortcut.map((shortcut, i) => <Kbd key={i}>{shortcut}</Kbd>)
          ) : (
            <Kbd>{shortcut}</Kbd>
          ))}
      </HStack>
    </ListItem>
  );
};

export default memo(ShortcutHelp);
