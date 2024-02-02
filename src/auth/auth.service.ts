import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

const SALT: number = 10;

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await this.compareToHash(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<string> {
    const payload: JwtPayload = { username: user.email, sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  async register(createUserDto: CreateUserDto): Promise<string> {
    const hash = await this.convertToHash(createUserDto.password);

    const user = await this.userService.create({
      ...createUserDto,
      password: hash,
    });

    return this.login(user);
  }

  convertToHash(plain: string): Promise<string> {
    return bcrypt.hash(plain, SALT);
  }

  compareToHash(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
