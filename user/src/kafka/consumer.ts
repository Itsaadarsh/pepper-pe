import { EachMessagePayload } from 'kafkajs';
import { kafka } from './config';
import dotenv from 'dotenv';
import userEntity from '../entity/user.entity';

dotenv.config();
export const kafkaConsumer = async () => {
  const consume = kafka.consumer({
    groupId: `${process.env.KAFKA_GROUPID}`,
  });

  await consume.connect();
  await consume.subscribe({ topic: `${process.env.KAFKA_TOPIC}` });
  await consume.run({
    eachMessage: async (message: EachMessagePayload) => {
      const key = message.message.key!.toString();
      const value = JSON.parse(message.message.value!.toString());

      if (key === 'userCreated') {
        const { $numberDecimal } = value.account_balance;
        await new userEntity({
          account_number: value.account_number,
          account_balance: $numberDecimal,
          email: value.email,
          name: value.name,
          password: value.password,
        }).save();
      }
    },
  });
};
