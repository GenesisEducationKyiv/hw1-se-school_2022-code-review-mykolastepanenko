export default class Chain {
  private handler: any;

  constructor(handler: any) {
    this.handler = handler;
  }

  public async handle() {
    return await this.handler.handle();
  }
}
