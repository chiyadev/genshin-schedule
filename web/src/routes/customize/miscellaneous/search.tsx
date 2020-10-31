import { MemorySearch } from "../../../memorySearch";
import { BackgroundDesc } from "./background";
import { SignOutDesc } from "./signOut";

export type MiscOption = "background" | "signOut";
export const MiscOptions: MiscOption[] = ["background", "signOut"];
export const MiscSearch = new MemorySearch<MiscOption>();

for (const option of MiscOptions) {
  MiscSearch.add("miscellaneous", option);
}

MiscSearch.add(BackgroundDesc, "background");
MiscSearch.add(SignOutDesc, "signOut");
