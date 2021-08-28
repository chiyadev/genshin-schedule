/** map with keys mappping to multiple values */
export class MultiMap<TKey, TValue> {
  readonly map = new Map<TKey, Set<TValue>>();

  get(key: TKey): TValue[] {
    const set = this.map.get(key);
    return set ? Array.from(set) : [];
  }

  add(key: TKey, value: TValue) {
    const set = this.map.get(key);

    if (set) {
      set.add(value);
    } else {
      this.map.set(key, new Set<TValue>([value]));
    }

    return this;
  }

  remove(key: TKey, value: TValue) {
    const set = this.map.get(key);

    if (set && set.delete(value)) {
      !set.size && this.map.delete(key);
      return true;
    }

    return false;
  }

  delete(key: TKey) {
    return this.map.delete(key);
  }

  has(key: TKey) {
    return this.map.has(key);
  }

  forEach(callback: (values: TValue[], key: TKey, map: MultiMap<TKey, TValue>) => void) {
    return this.map.forEach((set, key) => callback(Array.from(set), key, this));
  }

  clear() {
    return this.map.clear();
  }

  keys() {
    return this.map.keys();
  }
}
