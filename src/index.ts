import express from 'express';
import cors from 'cors';
import { producer } from './kafka/producer';
import { consumer } from './kafka/consumer';

const app = express();
app.use(cors());

consumer().then(() => {
  console.log('Consumer Connected');
});

app.get('/produce', async (_, res) => {
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
});

app.listen(8000, () => {
  console.log('Server started at 8080');
});
