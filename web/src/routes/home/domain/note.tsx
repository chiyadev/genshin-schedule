import React, { memo } from "react";
import { useConfig } from "../../../configs";

const NoteText = ({ name }: { name: string }) => {
  const [notes] = useConfig("itemNotes");
  const note = notes[name];

  if (!note) {
    return null;
  }

  return <span className="text-gray-600"> &mdash; {note}</span>;
};

export default memo(NoteText);
