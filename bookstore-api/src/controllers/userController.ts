import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) { // Define the type of error as 'any'
    res.status(500).json({ error: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    res.status(200).json({ token });
  } catch (error: any) { // Define the type of error as 'any'
    res.status(500).json({ error: error.message });
  }
};

export { register, login };
