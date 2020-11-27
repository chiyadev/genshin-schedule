import React, { memo } from "react";
import { useConfig } from "../../../utils/configs";
import { FaRegStickyNote } from "react-icons/fa";
import { HStack, Icon, Textarea, VStack } from "@chakra-ui/react";
import { Artifact } from "../../../db/artifacts";

const NoteInput = ({ artifact }: { artifact: Artifact }) => {
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
        placeholder="e.g. Lumine's artifact"
        value={notes[artifact.name] || ""}
        onInput={({ currentTarget: { value } }) => {
          setNotes((notes) => ({
            ...notes,
            [artifact.name]: value,
          }));
        }}
      />
    </VStack>
  );
};

export default memo(NoteInput);
