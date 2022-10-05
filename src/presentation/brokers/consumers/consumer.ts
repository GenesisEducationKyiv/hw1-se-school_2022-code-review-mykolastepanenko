export default class BrokerConsumer {
  private broker: any;

  constructor(broker: any) {
    this.broker = broker;
  }

  public async consume() {
    const connection = await this.broker.connect();
    const channel = await this.broker.connectToChannel(connection);

    const messages: any = await this.broker.consume(channel, "logs");
    connection.close();
    return messages;
  }
}
