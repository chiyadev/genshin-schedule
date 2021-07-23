import Fuse from "fuse.js";

export class MemorySearch<T> {
  readonly store = new Set<T>();
  readonly index = new Fuse<{ key: string; value: T }>([], {
    keys: ["key"],
    threshold: 0.2,
    findAllMatches: true,
  });

  add(text: string, value: T) {
    this.store.add(value);
    this.index.add({ key: text, value });
  }

  search(text: string): T[] {
    if (text.trim()) {
      return this.index
        .search({
          $and: text
            .split(" ")
            .filter((v) => v)
            .map((key) => ({ key })),
        })
        .map(({ item: { value } }) => value);
    } else {
      return [...this.store];
    }
  }
}
