import ppBankDetailsEntity from '../../entity/ppBankDetails.entity';
import userEntity from '../../entity/user.entity';

const isEmailAvailableRepo = async (email: string) => {
  return await userEntity.find({ email });
};

const isAccountNumberAvailableRepo = async (account_number: number) => {
  return await userEntity.find({ account_number });
};

const insertUserRepo = async (
  account_number: number,
  email: string,
  hash: string,
  name: string,
  account_balance: number
) => {
  const bankDetails = await ppBankDetailsEntity.findOne({ bank_id: 1 });
  const updateBalance = +bankDetails!.total_bank_balance + account_balance;
  bankDetails!.total_bank_balance = updateBalance;
  bankDetails!.number_of_users += 1;
  await bankDetails!.save();

  return await new userEntity({
    account_number,
    email,
    name,
    account_balance,
    password: hash,
  }).save();
};

export { isEmailAvailableRepo, isAccountNumberAvailableRepo, insertUserRepo };
