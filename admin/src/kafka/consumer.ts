import { EachMessagePayload } from 'kafkajs';
import { kafka } from './config';
import dotenv from 'dotenv';

dotenv.config();
export const kafkaConsumer = async () => {
  const consume = kafka.consumer({
    groupId: `${process.env.KAFKA_GROUPID}`,
  });

  await consume.connect();
  await consume.subscribe({ topic: `${process.env.KAFKA_TOPIC}` });
  await consume.run({
    eachMessage: async (message: EachMessagePayload) => {
      console.log(JSON.parse(message.message.value!.toString()));
    },
  });
};
