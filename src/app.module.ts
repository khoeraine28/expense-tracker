import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, PurchasesModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
