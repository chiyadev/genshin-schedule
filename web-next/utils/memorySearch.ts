function union<T>(set: Set<T>, other: Set<T>) {
  other.forEach((v) => {
    set.add(v);
  });
}

function intersect<T>(set: Set<T>, other: Set<T>) {
  set.forEach((v) => {
    if (!other.has(v)) set.delete(v);
  });
}

/** simple in-memory search engine, no performance guarantee */
export class MemorySearch<T> {
  readonly index = new Map<string, Set<T>>();

  tokenize(text: string) {
    const tokens = text
      .toLowerCase()
      .split(" ")
      .filter((x) => x);

    if (tokens.length === 0) {
      tokens.push("");
    }

    return tokens;
  }

  add(text: string, value: T) {
    for (const token of this.tokenize(text)) {
      let set = this.index.get(token);

      if (!set) {
        this.index.set(token, (set = new Set<T>()));
      }

      set.add(value);
    }
  }

  // performs exact matches
  match(text: string): T[] {
    const tokens = this.tokenize(text);
    const results = new Set<T>(this.index.get(tokens[0]));

    for (let i = 1; results.size && i < tokens.length; i++) {
      const other = this.index.get(tokens[i]);
      other && intersect(results, other);
    }

    return Array.from(results);
  }

  // performs fuzzy matches
  search(text: string): T[] {
    const tokens = this.tokenize(text);

    const sub = (token: string) => {
      const set = new Set<T>();

      this.index.forEach((other, key) => {
        key.includes(token) && union(set, other);
      });

      return set;
    };

    const results = sub(tokens[0]);

    for (let i = 1; i < tokens.length; i++) {
      intersect(results, sub(tokens[i]));
    }

    return Array.from(results);
  }
}
