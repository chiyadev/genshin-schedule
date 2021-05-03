import React, { memo } from "react";
import { useConfig } from "../../../utils/config";
import { FaRegStickyNote } from "react-icons/fa";
import { HStack, Icon, Textarea, VStack } from "@chakra-ui/react";
import { Character } from "../../../db/characters";
import { FormattedMessage, useIntl } from "react-intl";

const NoteInput = ({ character }: { character: Character }) => {
  const { formatMessage } = useIntl();
  const [notes, setNotes] = useConfig("itemNotes");

  return (
    <VStack align="stretch" spacing={2}>
      <HStack fontSize="lg" spacing={2}>
        <Icon as={FaRegStickyNote} />
        <div>
          <FormattedMessage id="additionalNotes" />
        </div>
      </HStack>

      <Textarea
        variant="filled"
        w="full"
        placeholder={formatMessage({ id: "characterNoteEg" })}
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
