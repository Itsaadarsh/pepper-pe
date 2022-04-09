import userEntity from '../../entity/user.entity';

const isEmailAvailableRepo = async (email: string) => {
  return await userEntity.find({ email });
};

const isAccountNumberAvailableRepo = async (account_number: number) => {
  return await userEntity.find({ account_number });
};

const insertNewUser = async (
  account_number: number,
  password: string,
  email: string,
  name: string,
  account_balance: number
) => {
  await new userEntity({ account_number, account_balance, email, name, password }).save();
};

export { isEmailAvailableRepo, isAccountNumberAvailableRepo, insertNewUser };
