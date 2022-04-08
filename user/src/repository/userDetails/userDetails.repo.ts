import userEntity from '../../entity/user.entity';

const isEmailAvailableRepo = async (email: string) => {
  return await userEntity.find({ email });
};

const isAccountNumberAvailableRepo = async (account_number: number) => {
  return await userEntity.find({ account_number });
};

export { isEmailAvailableRepo, isAccountNumberAvailableRepo };
