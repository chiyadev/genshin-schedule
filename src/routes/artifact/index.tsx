import { h } from "preact";
import { useMemo } from "preact/hooks";
import { useTabTitle } from "../../utils";
import WhiteCard from "../../whiteCard";
import { memo } from "preact/compat";
import { Artifact, Artifacts } from "../../db/artifacts";
import Toggle from "./toggle";
import Note from "./note";

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
      <Note artifact={artifact} />
    </WhiteCard>
  );
};

export default memo(ArtifactInfo);
