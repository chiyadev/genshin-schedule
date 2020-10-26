import { Artifact } from "../../../db/artifacts";
import { Link } from "preact-router";
import { h } from "preact";
import { memo } from "preact/compat";
import NoteText from "./note";

const ArtifactDisplay = ({ artifacts }: { artifacts: Artifact[] }) => {
  return (
    <div className="py-4 space-y-2">
      {artifacts.map(item => (
        <Link
          key={item.name}
          className="pl-4 flex flex-row space-x-2"
          href={`/artifacts/${item.name}`}
        >
          <img
            alt={item.name}
            src={`/assets/game/${item.name}.png`}
            className="w-6 h-6 object-fit"
          />

          <div className="flex flex-col justify-center text-sm">
            <div>
              {item.name}
              <NoteText name={item.name} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default memo(ArtifactDisplay);
