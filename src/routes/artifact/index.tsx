import { h } from "preact";
import { useMemo } from "preact/hooks";
import { useConfig } from "../../configs";
import DropLabel from "../../dropLabel";
import Checkbox from "../../checkbox";
import { arrayToggle, useTabTitle } from "../../utils";
import WhiteCard from "../../whiteCard";
import { memo } from "preact/compat";
import { Artifact, Artifacts } from "../../db/artifacts";

const ArtifactInfo = ({ artifact }: { artifact: string }) => {
  const info = useMemo(() => Artifacts.find(c => c.name === artifact), [
    artifact
  ]);

  useTabTitle(info?.name);

  return (
    <div className="container mx-auto p-4">
      {info ? <Inner artifact={info} /> : <div>No such artifact.</div>}
    </div>
  );
};

const Inner = ({ artifact }: { artifact: Artifact }) => {
  const [list, setList] = useConfig("artifacts");
  const exists = useMemo(() => list.includes(artifact.name), [list, artifact]);

  return (
    <WhiteCard className="space-y-4">
      <a href={artifact.wiki}>
        <div className="space-x-2 flex flex-row">
          <img
            alt={artifact.name}
            src={`/assets/game/${artifact.name}.png`}
            className="w-16 h-16 rounded-full"
          />

          <div className="flex flex-col justify-center">
            <div className="text-xl font-bold">{artifact.name}</div>
            <div className="text-xs text-gray-600">{artifact.type}</div>
          </div>
        </div>
      </a>

      <div className="text-sm">
        <DropLabel item={artifact} />
      </div>

      <div className="text-sm">
        <Checkbox
          value={exists}
          setValue={value => {
            setList(list => arrayToggle(list, artifact.name, value));
          }}
        >
          <div>Show on schedule</div>

          <div className="text-xs text-gray-600">
            Scheduled domains will appear on the days they are available.
          </div>
        </Checkbox>
      </div>
    </WhiteCard>
  );
};

export default memo(ArtifactInfo);
