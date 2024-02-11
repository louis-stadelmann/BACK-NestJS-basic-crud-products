import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { FiltersService } from './service/filters.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ limit: 10, ttl: 60 }]),
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [FiltersService],
})
export class AppModule {}
