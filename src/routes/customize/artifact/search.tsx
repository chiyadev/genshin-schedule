import { MemorySearch } from "../../../memorySearch";
import { Artifact, Artifacts } from "../../../db/artifacts";
import { Regions } from "../../../db/regions";

export const ArtifactSearch = new MemorySearch<Artifact>();

for (const artifact of Artifacts) {
  ArtifactSearch.add(artifact.type, artifact);
  ArtifactSearch.add(artifact.name, artifact);
}

for (const region of Regions) {
  for (const domain of region.domains) {
    for (const drops of domain.drops) {
      for (const artifact of drops.items) {
        if (artifact.type === "Artifact") {
          ArtifactSearch.add(region.name, artifact);
          ArtifactSearch.add(domain.name, artifact);

          drops.name && ArtifactSearch.add(drops.name, artifact);
          drops.days.forEach(day => ArtifactSearch.add(day, artifact));
        }
      }
    }
  }
}
