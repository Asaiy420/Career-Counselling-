import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'your-default-secret',
      { expiresIn: '7d' }
    );

    // Set secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
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

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-default-secret',
      { expiresIn: '7d' }
    );

    // Set secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
      },
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
    // Clear JWT cookie
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Set expiry in the past to delete the cookie
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};