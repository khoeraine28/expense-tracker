import { ExecutionContext, Injectable, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { SKIP_GUARDS_KEY } from 'src/decorators/skip-guards.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const guard = this.reflector.getAllAndOverride<Type<any>[]>(
      SKIP_GUARDS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (guard && guard.includes(JwtAuthGuard)) {
      return true;
    }

    return super.canActivate(context);
  }
}
