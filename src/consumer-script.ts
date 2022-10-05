import BrokerConsumer from "./presentation/brokers/consumers/consumer";
import RabbitMQ from "./logic/entities/brokers/RabbitMQ.entity";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.dev" });

const broker = new BrokerConsumer(
  new RabbitMQ({ host: process.env.RABBIT_MQ_HOST })
);
broker.consume().then(console.log);
