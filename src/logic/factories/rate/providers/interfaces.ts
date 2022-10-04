export interface IRateProvider {
  getRate(currency: string): object;
}
