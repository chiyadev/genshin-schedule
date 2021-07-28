import { MemorySearch } from "../../../utils/memorySearch";
import { Artifact, Artifacts } from "../../../db/artifacts";
import { Regions } from "../../../db/regions";
import { getTranslatedMessages } from "../../../langs";

export const ArtifactSearch = new MemorySearch<Artifact>();

for (const artifact of Artifacts) {
  ArtifactSearch.add(getTranslatedMessages(artifact.type), artifact);
  ArtifactSearch.add(getTranslatedMessages(artifact.name), artifact);
}

for (const region of Regions) {
  for (const domain of region.domains) {
    for (const drops of domain.drops) {
      for (const artifact of [...drops.items, ...(drops.itemsAux || [])]) {
        if (artifact.type === "Artifact") {
          ArtifactSearch.add(getTranslatedMessages(region.name), artifact);
          ArtifactSearch.add(getTranslatedMessages(domain.name), artifact);

          //drops.name && ArtifactSearch.add(drops.name, artifact);
          drops.days.forEach((day) => ArtifactSearch.add(day, artifact));
        }
      }
    }
  }
}
