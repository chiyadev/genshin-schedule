import React, { memo, useMemo } from "react";
import { ArtifactSearch } from "./search";
import Icon from "./icon";
import { Link } from "react-router-dom";

const ArtifactList = ({ search }: { search: string }) => {
  const results = useMemo(
    () =>
      ArtifactSearch.search(search).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    [search]
  );

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="text-xl font-bold">
        <img
          alt="Artifact"
          src="/assets/game/The Exile.png"
          className="w-8 h-8 inline"
        />

        <span className="align-middle"> Artifacts</span>
      </div>

      <div>
        {results.map((artifact) => (
          <Link key={artifact.name} to={`/artifacts/${artifact.name}`}>
            <Icon artifact={artifact} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(ArtifactList);
