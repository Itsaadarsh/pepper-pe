import express from 'express';
import bcrypt from 'bcrypt';
import validate from '../../middlerware/reqBodyValidation';
import { isEmailAvailableRepo, insertUserRepo } from '../../repository/createUser/register.repo';

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
      const account_number = Math.random().toFixed(16).split('.')[1];
      const createdUser = await insertUserRepo(+account_number, email, hash, name, defaultAccountBal); // Inserting new user
      res
        .status(201)
        .json({
          error: false,
          data: {
            message: [`User successfully registered with account number ${createdUser.account_number}`],
          },
        });
      return;
    });
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
  }
};
