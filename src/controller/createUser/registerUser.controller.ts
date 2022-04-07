import express from 'express';
import bcrypt from 'bcrypt';
import validate from '../../middlerware/reqBodyValidation';
import { isEmailAvailableRepo, insertUserRepo } from '../../repository/createUser/register.repo';
import { updateAccountBalanceRepo } from '../../repository/depWith/depWith.repo';

export const registerUser = async (req: express.Request, res: express.Response) => {
  try {
    // Server side validation
    if (validate(req, res)) {
      return;
    }

    const { name, email, password }: { email: string; name: string; password: string } = req.body;

    const isEmailAvailable = await isEmailAvailableRepo(email);
    if (isEmailAvailable.length != 0) {
      res.status(400).json({ error: true, data: { message: [`This user is already registered`] } });
      return;
    }

    // Hashing user password
    bcrypt.hash(password, 11, async (_, hash) => {
      const defaultAccountBal = 1000;
      const account_number = +('' + Math.random()).substring(2, 18);
      const createdUser = await insertUserRepo(+account_number, email, hash, name, 0); // Inserting new user
      await updateAccountBalanceRepo(account_number, 'DEPOSIT', defaultAccountBal, createdUser);

      res.status(201).json({
        error: false,
        data: { message: [`User successfully registered with account number ${createdUser.account_number}`] },
      });
      return;
    });
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
  }
};
