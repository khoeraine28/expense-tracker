import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [UsersModule, PurchasesModule, ProductsModule, StoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
