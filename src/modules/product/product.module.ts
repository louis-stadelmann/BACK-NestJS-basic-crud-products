import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductEntity, ProductSchema } from './schema/product.entities';
import { ProductRepository } from './product.repository';
import { FiltersService } from '../../service/filters.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductEntity.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, FiltersService],
})
export class ProductModule {}
