export function clampEnergy(energy: number) {
  return Math.max(0, Math.min(energy, 1000000)); // sane limit
}

export function clampRank(rank: number) {
  return Math.max(1, Math.min(rank, 10));
}

export const CurrencyCaps = [300, 600, 900, 1200, 1400, 1600, 1800, 2000, 2200, 2400];

export function getCurrencyCap(rank: number) {
  return CurrencyCaps[clampRank(rank) - 1];
}

export function clampCurrency(currency: number, rank: number) {
  return Math.max(0, Math.min(currency, getCurrencyCap(rank)));
}

export function roundCurrency(currency: number, rank: number) {
  return Math.floor(clampCurrency(currency, rank));
}

// [energy, rate (per hour)]
export const CurrencyRates: [number, number][] = [
  [0, 4],
  [2000, 8],
  [3000, 12],
  [4500, 16],
  [6000, 20],
  [8000, 22],
  [10000, 24],
  [12000, 26],
  [15000, 28],
  [20000, 30],
];

export function getCurrencyRate(energy: number) {
  let rate = 0;

  for (const [e, r] of CurrencyRates) {
    if (energy >= e) {
      rate = r;
    } else {
      break;
    }
  }

  return rate;
}

export function getCurrencyRecharge(energy: number, ms: number) {
  return Math.floor(ms / 3600000) * getCurrencyRate(energy);
}
