import { h } from "preact";
import { useMemo } from "preact/hooks";
import { useConfig } from "../../configs";
import DropLabel from "../../dropLabel";
import Checkbox from "../../checkbox";
import { arrayToggle, useTabTitle } from "../../utils";
import WhiteCard from "../../whiteCard";
import { memo } from "preact/compat";
import { Artifact, Artifacts } from "../../db/artifacts";
import { FaRegStickyNote } from "react-icons/fa";

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
  return (
    <WhiteCard divide>
      <a href={artifact.wiki}>
        <div className="space-x-2 py-4 flex flex-row">
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

      <Toggle artifact={artifact} />
      <Notes artifact={artifact} />
    </WhiteCard>
  );
};

const Toggle = ({ artifact }: { artifact: Artifact }) => {
  const [list, setList] = useConfig("artifacts");
  const exists = useMemo(() => list.includes(artifact.name), [list, artifact]);

  return (
    <div className="py-4 text-sm space-y-4">
      <DropLabel item={artifact} />

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
  );
};

const Notes = ({ artifact }: { artifact: Artifact }) => {
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

export default memo(ArtifactInfo);
