// import { kafkaConsumer } from './kafka/consumer';
import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
app.listen(process.env.PORT, async () => {
  try {
    // await kafkaConsumer();
    // console.log('Consumer Connected');

    await mongoose.connect(process.env.MONGO_URI!);
    console.log('User Service DB Connected');
  } catch (err) {
    console.log(err);
  }
  console.log(`User Service Server started at ${process.env.PORT}`);
});
