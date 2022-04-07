import { Request, Response } from 'express';
import validate from '../../middlerware/reqBodyValidation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isAdminIDAvailableRepo } from '../../repository/adminAuth/adminAuth.repo';

export const adminLogin = async (req: Request, res: Response) => {
  try {
    // Server side validation
    if (validate(req, res)) {
      return;
    }

    const { admin_id, password }: { admin_id: string; password: string } = req.body;
    const isAdminAvailable = await isAdminIDAvailableRepo(+admin_id);

    if (isAdminAvailable.length == 0) {
      res.status(400).json({ error: true, data: { message: ['Invalid Admin ID'] } });
      return;
    }

    bcrypt.compare(password, isAdminAvailable[0].password, (err, hash) => {
      if (err || hash === false) {
        res.status(400).json({ error: true, data: { message: [`Incorrect Password, Try Again!`] } });
        return;
      }

      // Generating JWT Token
      const token: string = jwt.sign({ admin_id: isAdminAvailable[0].admin_id }, process.env.JWT_TOKEN!, {
        expiresIn: '24h',
      });

      res.status(201).json({ error: false, data: { token } });
      return;
    });
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
  }
};
