export function randomStr(length: number) {
  const chars: string[] = [];

  for (let i = 0; i < length; i++) {
    chars[i] = Math.random().toString(36)[2];
  }

  return chars.join("");
}

export function arrayToggle<T>(array: T[], value: T, state: boolean) {
  if (state) {
    return [...array, value].filter((v, i, a) => a.indexOf(v) === i);
  } else {
    return array.filter((v) => v !== value);
  }
}
