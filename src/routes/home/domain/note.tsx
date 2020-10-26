import { useConfig } from "../../../configs";
import { h } from "preact";
import { memo } from "preact/compat";

const NoteText = ({ name }: { name: string }) => {
  const [notes] = useConfig("itemNotes");
  const note = notes[name];

  if (!note) {
    return null;
  }

  return <span className="text-gray-600"> &mdash; {note}</span>;
};

export default memo(NoteText);
