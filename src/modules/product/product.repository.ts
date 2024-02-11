import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { ProductDocument, ProductEntity } from './schema/product.entities';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { v4 as uuidV4 } from 'uuid';
import { ListProductDto } from './dto/list-product.dto';
import { FiltersService } from '../../service/filters.service';
import { FIELD_NAME_CREATED_AT } from '../../dto/created-at-filter.dto';
import { FIELD_NAME_UPDATED_AT } from '../../dto/updated-at-filter.dto';
import { EntityRepository } from '../../database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationResponse } from '../../database/pagination-response';
import * as ck from 'check-types';

@Injectable()
export class ProductRepository extends EntityRepository<ProductDocument> {
  constructor(
    @InjectModel(ProductEntity.name)
    private _productModel: Model<ProductDocument>,
    private readonly filters: FiltersService,
  ) {
    super(_productModel);
  }

  async createProduct(product: CreateProductDto): Promise<ProductEntity> {
    const result = await this.find({
      name: product.name,
      category: product.category,
    });

    if (!ck.emptyArray(result)) {
      throw new BadRequestException(
        `A product with category: ${product.category} and name: ${product.name} already exist`,
      );
    }
    return await this.create({ id: uuidV4(), ...product });
  }

  async listProduct(
    query: ListProductDto,
  ): Promise<PaginationResponse<ProductDocument>> {
    const { offset, limit, sort } = { ...query };
    let filter: FilterQuery<ProductDocument>;

    filter = this.filters.dateRangeFilter(
      FIELD_NAME_CREATED_AT,
      query.createdBefore,
      query.createdAfter,
    );

    filter = {
      ...filter,
      ...this.filters.dateRangeFilter(
        FIELD_NAME_UPDATED_AT,
        query.updatedBefore,
        query.updatedAfter,
      ),
    };

    filter = {
      ...filter,
      ...this.filters.numberRangeFilter(
        'price',
        query.priceMin,
        query.priceMax,
      ),
    };

    filter = {
      ...filter,
      ...this.filters.numberRangeFilter(
        'quantity',
        query.quantityMin,
        query.quantityMax,
      ),
    };

    if (query.category) {
      filter = {
        ...filter,
        category: query.category,
      };
    }

    if (query.name) {
      filter = {
        ...filter,
        name: new RegExp(query.name, 'i'),
      };
    }

    return this.paginatedFind(filter, offset, limit, sort);
  }

  async findOneProduct(id: string): Promise<ProductEntity | null> {
    return this.findOne({ id: id });
  }

  async updateOneProduct(
    id: string,
    body: UpdateProductDto,
  ): Promise<ProductEntity | null> {
    return this.findOneAndUpdate({ id: id }, body);
  }

  async deleteOneProduct(id: string): Promise<boolean> {
    return await this.deleteMany({ id: id });
  }
}
