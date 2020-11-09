import Checkbox from "../../checkbox";
import { arrayToggle } from "../../utils";
import { trackEvent } from "../../track";
import React, { memo, useMemo } from "react";
import { useConfig } from "../../configs";
import { Character } from "../../db/characters";

const Toggle = ({ character }: { character: Character }) => {
  const [list, setList] = useConfig("characters");

  const exists = useMemo(() => list.includes(character.name), [
    list,
    character,
  ]);

  return (
    <Checkbox
      value={exists}
      setValue={(value) => {
        setList((list) => arrayToggle(list, character.name, value));
        trackEvent("character", "materialToggle");
      }}
    >
      <div>Show on schedule</div>

      <div className="text-xs text-gray-600">
        Scheduled domains will appear on the days they are available.
      </div>
    </Checkbox>
  );
};

export default memo(Toggle);
