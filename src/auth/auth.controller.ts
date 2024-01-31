import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RequestWithUser } from 'src/types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { SkipGuards } from 'src/decorators/skip-guards.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
}
