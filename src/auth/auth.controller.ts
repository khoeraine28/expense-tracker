import {
  Body,
  Controller,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from 'src/types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { SkipGuards } from 'src/decorators/skip-guards.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ExistingUserExceptionFilter } from 'src/users/filters/existing-user-exception.filter';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipGuards(JwtAuthGuard)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: RequestWithUser) {
    return {
      access_token: await this.authService.login(req.user),
    };
  }

  @UseFilters(ExistingUserExceptionFilter)
  @SkipGuards(JwtAuthGuard)
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return {
      access_token: await await this.authService.register(createUserDto),
    };
  }
}
