import React, { memo } from "react";
import { useConfig } from "../../../utils/config";
import { HStack, Icon, Textarea, VStack } from "@chakra-ui/react";
import { Artifact } from "../../../db/artifacts";
import { FormattedMessage, useIntl } from "react-intl";
import { AlignCenter } from "react-feather";

const NoteInput = ({ artifact }: { artifact: Artifact }) => {
  const { formatMessage } = useIntl();
  const [notes, setNotes] = useConfig("itemNotes");

  return (
    <VStack align="stretch" spacing={2}>
      <HStack fontSize="lg" spacing={2}>
        <Icon as={AlignCenter} />
        <div>
          <FormattedMessage defaultMessage="Additional notes" />
        </div>
      </HStack>

      <Textarea
        variant="filled"
        w="full"
        placeholder={formatMessage({ defaultMessage: "e.g. Lumine's artifact" })}
        value={notes[artifact.name] || ""}
        onChange={({ currentTarget: { value } }) => {
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
