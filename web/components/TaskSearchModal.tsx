import React, { Dispatch, memo, useEffect, useState } from "react";
import { Icon, Input, InputGroup, InputLeftElement, Modal, ModalContent, ModalOverlay, VStack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useConfig } from "../utils/configs";
import { useHotkeys } from "react-hotkeys-hook";

const TaskSearchModal = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<boolean> }) => {
  const [query, setQuery] = useConfig("taskQuery");
  const [value, setValue] = useState(query);

  useEffect(() => setValue(query), [query]);
  useEffect(() => setQuery(value), [open]);

  useHotkeys("f", (e) => {
    setOpen(true);
    e.preventDefault();
  });

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} size="lg">
      <ModalOverlay />
      <ModalContent>
        <VStack align="stretch" spacing={2}>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.500" />
            </InputLeftElement>

            <Input
              value={value}
              onChange={({ currentTarget: { value } }) => setValue(value)}
              placeholder="Search tasks..."
              onKeyDown={(e) => {
                switch (e.keyCode) {
                  // enter
                  case 13:
                    setOpen(false);
                    break;

                  // escape
                  case 27:
                    setValue("");
                    setOpen(false);
                    break;

                  default:
                    return;
                }

                e.preventDefault();
              }}
            />
          </InputGroup>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default memo(TaskSearchModal);
