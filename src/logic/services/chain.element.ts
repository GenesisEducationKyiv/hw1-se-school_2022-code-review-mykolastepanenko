export default class ChainElement {
  private handler: any;

  public setNext(handler: object): any {
    this.handler = handler;
    return handler;
  }

  public handle(): any {
    if (this.handler) {
      return this.handler.handle();
    }
  }
}
