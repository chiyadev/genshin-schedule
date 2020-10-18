export function arrayToggle<T>(array: T[], value: T, state: boolean) {
  if (state) {
    return [...array, value].filter((v, i, a) => a.indexOf(v) === i);
  } else {
    return array.filter(v => v !== value);
  }
}
