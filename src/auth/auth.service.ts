import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

const SALT: number = 10;

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await this.compareToHash(pass, user.password))) {
      return user;
    }
    return null;
  }

  convertToHash(plain: string) {
    return bcrypt.hash(plain, SALT);
  }

  compareToHash(plain: string, hashed: string) {
    return bcrypt.compare(plain, hashed);
  }
}
