import React, { memo } from "react";
import { Weapon } from "../../db/weapons";
import { useConfig } from "../../configs";
import { FaRegStickyNote } from "react-icons/fa";

const Note = ({ weapon }: { weapon: Weapon }) => {
  const [notes, setNotes] = useConfig("itemNotes");

  return (
    <div className="py-4 space-y-2">
      <div className="text-lg">
        <FaRegStickyNote className="inline" />
        <span className="align-middle"> Additional notes</span>
      </div>

      <textarea
        className="w-full text-sm"
        placeholder="e.g. Lumine's weapon"
        value={notes[weapon.name] || ""}
        onInput={({ currentTarget: { value } }) => {
          setNotes((notes) => ({
            ...notes,
            [weapon.name]: value,
          }));
        }}
      />
    </div>
  );
};

export default memo(Note);
