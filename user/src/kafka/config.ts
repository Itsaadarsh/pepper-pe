import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENTID,
  brokers: [`${process.env.KAFKA_BROKER}`],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: `${process.env.KAFKA_USERNAME}`,
    password: `${process.env.KAFKA_PASSWORD}`,
  },
});
