import React, { memo } from "react";
import { Weapon } from "../../../db/weapons";
import { useConfig } from "../../../utils/config";
import { FaRegStickyNote } from "react-icons/fa";
import { HStack, Icon, Textarea, VStack } from "@chakra-ui/react";
import { FormattedMessage, useIntl } from "react-intl";

const NoteInput = ({ weapon }: { weapon: Weapon }) => {
  const { formatMessage } = useIntl();
  const [notes, setNotes] = useConfig("itemNotes");

  return (
    <VStack align="stretch" spacing={2}>
      <HStack fontSize="lg" spacing={2}>
        <Icon as={FaRegStickyNote} />
        <div>
          <FormattedMessage defaultMessage="Additional notes" />
        </div>
      </HStack>

      <Textarea
        variant="filled"
        w="full"
        placeholder={formatMessage({ defaultMessage: "e.g. Lumine's weapon" })}
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
