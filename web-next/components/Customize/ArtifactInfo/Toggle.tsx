import React, { memo, useMemo } from "react";
import { arrayToggle } from "../../../utils";
import { trackEvent } from "../../../utils/umami";
import { useConfig } from "../../../utils/configs";
import { chakra, Checkbox, VStack } from "@chakra-ui/react";
import { Artifact } from "../../../db/artifacts";

const Toggle = ({ artifact }: { artifact: Artifact }) => {
  const [list, setList] = useConfig("artifacts");
  const exists = useMemo(() => list.includes(artifact.name), [list, artifact]);

  return (
    <Checkbox
      isChecked={exists}
      onChange={({ target: { checked } }) => {
        setList((list) => arrayToggle(list, artifact.name, checked));
        trackEvent("artifact", "toggle");
      }}
    >
      <VStack align="start" spacing={0}>
        <div>Show on schedule</div>

        <chakra.div fontSize="sm" color="gray.500">
          Scheduled domains will appear on the days they are available.
        </chakra.div>
      </VStack>
    </Checkbox>
  );
};

export default memo(Toggle);
