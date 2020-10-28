import { MemorySearch } from "../../../memorySearch";
import { BackgroundDesc } from "./background";

export type MiscOption = "background";
export const MiscOptions: MiscOption[] = ["background"];
export const MiscSearch = new MemorySearch<MiscOption>();

for (const option of MiscOptions) {
  MiscSearch.add("miscellaneous", option);
}

MiscSearch.add(BackgroundDesc, "background");
