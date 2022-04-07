import { kafka } from './config';

const producer = kafka.producer();

export const producerEmit = async (topic: string, msg: string) => {
  try {
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [
        {
          value: msg,
        },
      ],
    });
  } catch (err) {
    console.log('Producer Error: ', err);
  }
};
