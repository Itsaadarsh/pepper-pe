import { kafka } from './config';
import dotenv from 'dotenv';

dotenv.config();
const producer = kafka.producer();

export const producerEmit = async (topic: string, msg: string, key: string) => {
  try {
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [
        {
          key: key,
          value: msg,
        },
      ],
    });
    console.log('Producer message emitted');
  } catch (err) {
    console.log('Producer Error: ', err);
  }
};
