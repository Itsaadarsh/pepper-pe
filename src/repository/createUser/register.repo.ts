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
  return await new userEntity({
    account_number,
    email,
    name,
    account_balance,
    password: hash,
  }).save();
};

export { isEmailAvailableRepo, isAccountNumberAvailableRepo, insertUserRepo };
