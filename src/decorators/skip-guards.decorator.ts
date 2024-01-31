import { SetMetadata, Type } from '@nestjs/common';

export const SKIP_GUARDS_KEY = 'SKIP';

export const SkipGuards = (...guards: Type<any>[]) =>
  SetMetadata(SKIP_GUARDS_KEY, guards);
