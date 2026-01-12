export const RATES = {
  USD: 1,
  GEL: 2.69,
  //eur: 0.92, test
};

export type Currencies = keyof typeof RATES;

export const CURRENCIES = Object.keys(RATES) as Currencies[];
