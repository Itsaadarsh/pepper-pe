import { kafkaConsumer } from './kafka/consumer';
import { app } from './app';
import mongoose from 'mongoose';

app.listen(process.env.PORT, async () => {
  try {
    await kafkaConsumer();
    console.log('Consumer Connected');

    await mongoose.connect(process.env.MONGO_URI!);
    console.log('DB Connected');
  } catch (err) {
    console.log(err);
  }
  console.log(`Server started at ${process.env.PORT}`);
});
