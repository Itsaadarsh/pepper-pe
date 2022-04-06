import { EachMessagePayload } from 'kafkajs';
import { kafka } from './config';

export const kafkaConsumer = async () => {
  const consume = kafka.consumer({
    groupId: 'pp-consumer',
  });

  await consume.connect();
  await consume.subscribe({ topic: 'pp-default' });
  await consume.run({
    eachMessage: async (message: EachMessagePayload) => {
      console.log(JSON.parse(message.message.value!.toString()));
    },
  });
};
