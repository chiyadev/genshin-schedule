// https://stackoverflow.com/a/47496558/13160620
export function randomStr(length: number) {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
}
