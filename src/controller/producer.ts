import { producer } from '../kafka/producer';
import { Request, Response } from 'express';

export const producerController = async (_: Request, res: Response) => {
  await producer.connect();
  await producer.send({
    topic: 'pp-default',
    messages: [
      {
        value: JSON.stringify({
          msg: 'Welcome to Pepper Pe!',
        }),
      },
    ],
  });
  res.send('msg sent');
};
