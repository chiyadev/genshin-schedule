import { h } from "preact";
import { useMemo } from "preact/hooks";
import { Regions } from "../../db/regions";
import { Link } from "preact-router";
import { useConfig } from "../../configs";
import { cx } from "emotion";
import LazyLoad from "react-lazyload";
import { MemorySearch } from "../../memorySearch";
import { memo } from "preact/compat";
import { Artifact, Artifacts } from "../../db/artifacts";

const db = new MemorySearch<Artifact>();

for (const artifact of Artifacts) {
  db.add(artifact.type, artifact);
  db.add(artifact.name, artifact);
}

for (const region of Regions) {
  for (const domain of region.domains) {
    for (const drops of domain.drops) {
      for (const artifact of drops.items) {
        if (artifact.type === "Artifact") {
          db.add(region.name, artifact);
          db.add(domain.name, artifact);

          drops.name && db.add(drops.name, artifact);
          drops.days.forEach(day => db.add(day, artifact));
        }
      }
    }
  }
}

const ArtifactList = ({ search }: { search: string }) => {
  const results = useMemo(
    () => db.search(search).sort((a, b) => a.name.localeCompare(b.name)),
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
        {results.map(artifact => (
          <Link key={artifact.name} href={`/artifacts/${artifact.name}`}>
            <ArtifactIcon artifact={artifact} />
          </Link>
        ))}
      </div>
    </div>
  );
};

const ArtifactIcon = ({ artifact }: { artifact: Artifact }) => {
  const [existing] = useConfig("artifacts");

  const alreadyAdded = useMemo(() => existing.includes(artifact.name), [
    existing,
    artifact.name
  ]);

  return (
    <div
      className={cx(
        "inline-block m-1 text-center bg-white text-black rounded shadow-lg w-32",
        { "opacity-50": alreadyAdded }
      )}
    >
      <LazyLoad height="5rem">
        <img
          alt={artifact.name}
          src={`/assets/game/${artifact.name}.png`}
          className="w-20 h-20 mx-auto mt-2 object-fit"
        />
      </LazyLoad>

      <div className="text-center text-sm p-2 truncate">{artifact.name}</div>
    </div>
  );
};

export default memo(ArtifactList);
