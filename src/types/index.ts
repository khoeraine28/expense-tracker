import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}

export interface AccessToken {
  accessToken: string;
}

export interface JwtPayload {
  username: string;
  sub: number;
}

export interface JwtDecodedPayload extends JwtPayload {
  exp: number;
  iat: number;
}
