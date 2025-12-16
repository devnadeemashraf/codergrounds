import { JwtPayload } from 'jsonwebtoken';

export interface UserPayloadInTokenPayload {
  userId: string;
  username: string;
  userEmail: string;
  tokenVersion: number;
}

export interface TokenPayload extends JwtPayload, UserPayloadInTokenPayload {}
