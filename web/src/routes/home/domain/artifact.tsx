import React, { memo } from "react";
import { Artifact } from "../../../db/artifacts";
import NoteText from "./note";
import { Link } from "react-router-dom";
import GameImage from "../../../gameImage";

const ArtifactDisplay = ({ artifacts }: { artifacts: Artifact[] }) => {
  return (
    <div className="py-4 space-y-2">
      {artifacts.map((item) => (
        <Link
          key={item.name}
          className="pl-4 flex flex-row space-x-2"
          to={`/artifacts/${item.name}`}
        >
          <GameImage name={item.name} className="w-6 h-6 object-fit" />

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
