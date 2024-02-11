import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from './dto/product.dto';
import { ProductRepository } from './product.repository';
import { ListProductDto } from './dto/list-product.dto';
import { plainToInstance } from 'class-transformer';
import { PaginationResponse } from '../../database/pagination-response';
import { ProductDocument } from './schema/product.entities';
import { transformToPaginatedResponse } from '../../utils/to-paginated-dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async createProduct(product: CreateProductDto): Promise<ProductDto> {
    const createdProduct = await this.productRepo.createProduct(product);
    return plainToInstance(ProductDto, createdProduct, {
      excludeExtraneousValues: true,
    });
  }

  async listProduct(
    query: ListProductDto,
  ): Promise<PaginationResponse<ProductDto>> {
    const paginationResponse: PaginationResponse<ProductDocument> =
      await this.productRepo.listProduct(query);
    return transformToPaginatedResponse(paginationResponse, ProductDto);
  }

  async findProduct(id: string): Promise<ProductDto> {
    const product = await this.productRepo.findOneProduct(id);
    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async updateProduct(id: string, body: UpdateProductDto): Promise<ProductDto> {
    const updatedProduct = await this.productRepo.updateOneProduct(id, body);
    if (!updatedProduct) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    return plainToInstance(ProductDto, updatedProduct, {
      excludeExtraneousValues: true,
    });
  }

  async deleteProduct(id: string): Promise<void> {
    const deletedProduct = await this.productRepo.deleteOneProduct(id);
    if (!deletedProduct) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
  }
}
