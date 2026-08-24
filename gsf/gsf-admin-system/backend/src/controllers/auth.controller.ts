import { Request, Response } from 'express';
import { initialAdmins } from '../config/database';
import { generateToken } from '../utils/jwt';
import { verifyPassword } from '../utils/password';

export const loginAdmin = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const admin = initialAdmins.find(a => a.email.toLowerCase() === email.toLowerCase());

  // Constant-shaped response whether the email is unknown or the password is
  // wrong, so this endpoint doesn't reveal which admin emails exist.
  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
  }

  const token = generateToken(admin);
  // Never return the password hash to the client.
  const { passwordHash, ...safeAdmin } = admin;

  return res.json({
    success: true,
    message: 'Admin authentication successful.',
    token,
    user: safeAdmin
  });
};

export const getMe = (req: any, res: Response) => {
  return res.json({
    success: true,
    user: req.user
  });
};
