import { chakra } from "@chakra-ui/react";
import React, { memo } from "react";
import { useConfig } from "../../../utils/config";

const ItemNote = ({ name }: { name: string }) => {
  const [notes] = useConfig("itemNotes");
  const note = notes[name];

  if (!note) {
    return null;
  }

  return (
    <chakra.span color="gray.500" wordBreak="break-word">
      <span> &mdash; </span>
      {note}
    </chakra.span>
  );
};

export default memo(ItemNote);
