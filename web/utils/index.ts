export function randomStr(length: number) {
  const chars: string[] = [];

  for (let i = 0; i < length; i++) {
    chars[i] = Math.random().toString(36)[2];
  }

  return chars.join("");
}

export function arrayToggle<T>(array: T[], value: T, state?: boolean) {
  if (typeof state === "undefined") {
    state = !array.includes(value);
  }

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

// Adds the given default message to the translation file without translating it immediately when called.
// Used in database files to register entity names.
// Also see: ../langs/extract.js
export function registerMessage(message: { defaultMessage: string }) {
  return message.defaultMessage;
}
