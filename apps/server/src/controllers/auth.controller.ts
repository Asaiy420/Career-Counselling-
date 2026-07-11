import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

export const registerController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // check if user already exists

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      message: 'User registered successfully',
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // check if user exists

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials!' });
    }

    // check if password is correct

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      message: 'User logged in successfully',
    });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const logoutController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    // TODO: Implement logout functionality (e.g., clearing cookies or tokens) -> Nikesh need to implement this
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};