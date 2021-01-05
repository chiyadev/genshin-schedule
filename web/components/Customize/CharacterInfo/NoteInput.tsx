import React, { memo } from "react";
import { useConfig } from "../../../utils/configs";
import { FaRegStickyNote } from "react-icons/fa";
import { HStack, Icon, Textarea, VStack } from "@chakra-ui/react";
import { Character } from "../../../db/characters";

const NoteInput = ({ character }: { character: Character }) => {
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
        placeholder="e.g. Anemo traveler"
        value={notes[character.name] || ""}
        onChange={({ currentTarget: { value } }) => {
          setNotes((notes) => ({
            ...notes,
            [character.name]: value,
          }));
        }}
      />
    </VStack>
  );
};

export default memo(NoteInput);
