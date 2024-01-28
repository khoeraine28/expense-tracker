import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [UsersModule, PurchasesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
