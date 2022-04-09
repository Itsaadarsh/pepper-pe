import transactionEntity from '../../entity/transaction.entity';

const getTransactionsRepo = async (account_number: number) => {
  return await transactionEntity.find({ from: account_number });
};

const insertTransaction = async (from: number, to: number, amount: number, remarks: string) => {
  return await new transactionEntity({ from, to, amount, remarks }).save();
};

export { insertTransaction, getTransactionsRepo };
