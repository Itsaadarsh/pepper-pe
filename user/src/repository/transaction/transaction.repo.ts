import transactionEntity from '../../entity/transaction.entity';

const insertTransaction = async (from: number, to: number, amount: number, remarks: string) => {
  return await new transactionEntity({ from, to, amount, remarks }).save();
};

export { insertTransaction };
