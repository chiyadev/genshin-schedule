import React, { memo } from "react";
import { Weapon } from "../../../db/weapons";
import { useConfig } from "../../../utils/configs";
import { FaRegStickyNote } from "react-icons/fa";
import { HStack, Icon, Textarea, VStack } from "@chakra-ui/react";

const NoteInput = ({ weapon }: { weapon: Weapon }) => {
  const [notes, setNotes] = useConfig("itemNotes");

  return (
    <VStack align="stretch" spacing={2}>
      <HStack fontSize="lg" spacing={2}>
        <Icon as={FaRegStickyNote} />
        <div>Additional notes</div>
      </HStack>

      <Textarea
        variant="filled"
        w="full"
        placeholder="e.g. Lumine's weapon"
        value={notes[weapon.name] || ""}
        onChange={({ currentTarget: { value } }) => {
          setNotes((notes) => ({
            ...notes,
            [weapon.name]: value,
          }));
        }}
      />
    </VStack>
  );
};

export default memo(NoteInput);
