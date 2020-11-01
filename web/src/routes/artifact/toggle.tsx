import React, { memo, useMemo } from "react";
import { Artifact } from "../../db/artifacts";
import { useConfig } from "../../configs";
import DropLabel from "../../dropLabel";
import Checkbox from "../../checkbox";
import { arrayToggle } from "../../utils";
import { trackEvent } from "../../track";

const Toggle = ({ artifact }: { artifact: Artifact }) => {
  const [list, setList] = useConfig("artifacts");
  const exists = useMemo(() => list.includes(artifact.name), [list, artifact]);

  return (
    <div className="py-4 text-sm space-y-4">
      <DropLabel item={artifact} />

      <Checkbox
        value={exists}
        setValue={(value) => {
          setList((list) => arrayToggle(list, artifact.name, value));
          trackEvent("artifact", "toggle");
        }}
      >
        <div>Show on schedule</div>

        <div className="text-xs text-gray-600">
          Scheduled domains will appear on the days they are available.
        </div>
      </Checkbox>
    </div>
  );
};

export default memo(Toggle);
