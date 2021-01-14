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

export function hexToRgb(hex: string) {
  const value = parseInt(hex.replace("#", ""), 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

export function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
