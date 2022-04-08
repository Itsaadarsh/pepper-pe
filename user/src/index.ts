// import { kafkaConsumer } from './kafka/consumer';
import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('User Service DB Connected');

    // await kafkaConsumer();
    // console.log('User Service Consumer Connected');
  } catch (err) {
    console.log(err);
  }
  console.log(`User Service Server started at ${process.env.PORT}`);
});
