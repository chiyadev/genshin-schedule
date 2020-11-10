export const ResinCap = 160;
export const ResinsPerMinute = 1 / 8;

export function getResinRecharge(ms: number) {
  return (ms / 60000) * ResinsPerMinute;
}

export function clampResin(value: number) {
  return Math.max(0, Math.min(ResinCap, value));
}

export function roundResin(value: number) {
  return Math.floor(clampResin(value));
}
