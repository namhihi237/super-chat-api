import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId: string;
}

@Injectable()
export class UtilsService {
  generateToken = (payload: JWTPayload): string => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret);
  };

  verifyToken = (token: string): any => {
    try {
      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  };
}
