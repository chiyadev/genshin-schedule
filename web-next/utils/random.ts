export function randomStr(length: number) {
  const chars: string[] = [];

  for (let i = 0; i < length; i++) {
    chars[i] = Math.random().toString(36)[2];
  }

  return chars.join("");
}
