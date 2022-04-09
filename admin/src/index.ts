import { kafkaConsumer } from './kafka/consumer';
import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Admin Service DB Connected');

    await kafkaConsumer();
    console.log('Admin Service Consumer Connected');
  } catch (err) {
    console.log(err);
  }
  console.log(`Admin Service Server started at ${process.env.PORT}`);
});
