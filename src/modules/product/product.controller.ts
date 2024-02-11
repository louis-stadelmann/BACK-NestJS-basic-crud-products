import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from './dto/product.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ListProductDto } from './dto/list-product.dto';
import { PaginationResponse } from '../../database/pagination-response';
import { productDtoStub } from './stub/product-dto.stub';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a product',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ProductDto,
    description: 'Create a product',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'An error has occurred',
  })
  @ApiBody({
    type: CreateProductDto,
    required: true,
  })
  async createProduct(@Body() body: CreateProductDto): Promise<ProductDto> {
    return await this.productService.createProduct(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get a list of products',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a list of products filtered by queries',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'An error has occurred',
  })
  async listProduct(
    @Query() query: ListProductDto,
  ): Promise<PaginationResponse<ProductDto>> {
    return await this.productService.listProduct(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  @ApiOperation({
    summary: 'Get a product',
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    type: ProductDto,
    description: 'Get a product by id',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No product has been found with this id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'An error has occurred',
  })
  @ApiParam({
    name: 'id',
    description: 'Product id',
    example: productDtoStub().id,
  })
  async findProduct(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.findProduct(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Modify a product',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductDto,
    description: 'Modify a product by id',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No product has been found with this id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'An error has occurred',
  })
  @ApiParam({
    name: 'id',
    description: 'Product id',
    example: productDtoStub().id,
  })
  async updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Promise<ProductDto> {
    return await this.productService.updateProduct(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete a product',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete a product by id',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No product has been found with this id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'An error has occurred',
  })
  @ApiParam({
    name: 'id',
    description: 'Product id',
    example: productDtoStub().id,
  })
  async deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
