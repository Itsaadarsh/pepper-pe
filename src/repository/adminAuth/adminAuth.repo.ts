import adminEntity from '../../entity/admin.entity';
import bcrypt from 'bcrypt';

// All DB calls for admin login
const isAdminIDAvailableRepo = async (adminId: number) => {
  return await adminEntity.find({ adminId });
};

const insertAdminRepo = async (adminId: number, password: string) => {
  const hash = await bcrypt.hash(password, 11);

  await new adminEntity({
    adminId: adminId,
    password: hash,
  }).save();
};

export { isAdminIDAvailableRepo, insertAdminRepo };
