type TRateProvider = {
  ok: boolean;
  value?: number;
  source?: string;
  currency?: string;
  error?: string;
};

export interface IRateProvider {
  getRate(currency: string): Promise<TRateProvider>;
}
