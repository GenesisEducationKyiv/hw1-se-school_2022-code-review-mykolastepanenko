export default class BrokerPublisher {
  private broker: any;

  constructor(broker: any) {
    this.broker = broker;
  }

  public async send(msg: string) {
    const connection = await this.broker.connect();
    const channel = await this.broker.connectToChannel(connection);

    const isSended: any = await this.broker.send(channel, "logs", msg);
    connection.close();
    console.log(isSended);
  }
}
