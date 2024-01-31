import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RequestWithUser } from 'src/types';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: RequestWithUser) {
    return req.user;
  }
}
