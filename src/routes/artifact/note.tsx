import { Artifact } from "../../db/artifacts";
import { useConfig } from "../../configs";
import { FaRegStickyNote } from "react-icons/fa";
import { h } from "preact";
import { memo } from "preact/compat";

const Note = ({ artifact }: { artifact: Artifact }) => {
  const [notes, setNotes] = useConfig("itemNotes");

  return (
    <div className="py-4 space-y-2">
      <div className="text-lg">
        <FaRegStickyNote className="inline" />
        <span className="align-middle"> Additional notes</span>
      </div>

      <textarea
        className="w-full text-sm"
        placeholder="e.g. Lumine's artifact"
        value={notes[artifact.name] || ""}
        onInput={({ currentTarget: { value } }) => {
          setNotes(notes => ({
            ...notes,
            [artifact.name]: value
          }));
        }}
      />
    </div>
  );
};

export default memo(Note);
