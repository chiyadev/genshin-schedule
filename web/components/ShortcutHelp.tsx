import React, { Dispatch, memo, ReactNode } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useHotkeys } from "react-hotkeys-hook";
import { Heading, HStack, Kbd, ListItem, UnorderedList, VStack } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import { FaKeyboard } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";

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
            <Icon as={FaKeyboard} />
            <div>
              <FormattedMessage id="shortcuts" />
            </div>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={4}>
            <Category heading={<FormattedMessage id="serverClock" />}>
              <KeyHint shortcut={<FormattedMessage id="key.left" />}>
                <FormattedMessage id="previousDay" />
              </KeyHint>
              <KeyHint shortcut={<FormattedMessage id="key.right" />}>
                <FormattedMessage id="nextDay" />
              </KeyHint>
              <KeyHint shortcut={<FormattedMessage id="key.esc" />}>
                <FormattedMessage id="shortcutResetOffset" />
              </KeyHint>
            </Category>

            <Category heading={<FormattedMessage id="resinCalc" />}>
              <KeyHint>
                <FormattedMessage
                  id="shortcutSubtract"
                  values={{
                    values: (
                      <>
                        20 <Kbd>2</Kbd>, 30 <Kbd>3</Kbd>, 40 <Kbd>4</Kbd>, 60 <Kbd>6</Kbd>
                      </>
                    ),
                  }}
                />
              </KeyHint>
            </Category>

            <Category heading={<FormattedMessage id="taskSchd" />}>
              <KeyHint shortcut="f">
                <FormattedMessage id="shortcutSearchTask" />
              </KeyHint>
              <KeyHint shortcut="l">
                <FormattedMessage id="shortcutToggleList" />
              </KeyHint>
              <KeyHint shortcut="n">
                <FormattedMessage id="shortcutFocusNextTask" />
              </KeyHint>
              <KeyHint shortcut={`${formatMessage({ id: "key.shift" })}+n`}>
                <FormattedMessage id="shortcutFocusPrevTask" />
              </KeyHint>
              <KeyHint shortcut="d">
                <FormattedMessage id="taskDone" />
              </KeyHint>
            </Category>

            <Category heading={<FormattedMessage id="other" />}>
              <KeyHint shortcut="k">
                <FormattedMessage id="shortcutShow" />
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
