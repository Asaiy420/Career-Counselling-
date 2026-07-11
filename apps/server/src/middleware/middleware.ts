import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const authHeader = req.headers.authorization;
    let token = '';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1] || '';
    }

    if (!token) {
      return res.status(401).json({ message: 'Authentication token required' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-default-secret'
    ) as { userId: string; email: string; role: string };

    req.user = decoded;
    next();
  } catch (err: unknown) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
