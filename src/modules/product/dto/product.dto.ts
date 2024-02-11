import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CategoryEnum } from '../../category/category.enum';
import { Expose } from 'class-transformer';
import { productDtoStub } from '../stub/product-dto.stub';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ example: productDtoStub().id })
  id: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ example: productDtoStub().name })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ example: productDtoStub().description })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Expose()
  @ApiProperty({ example: productDtoStub().price })
  price: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Expose()
  @ApiProperty({ example: productDtoStub().quantity })
  quantity: number;

  @IsEnum(CategoryEnum)
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ example: productDtoStub().category })
  category: CategoryEnum;

  @IsDate()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ example: productDtoStub().createdAt })
  createdAt: string;

  @IsDate()
  @IsOptional()
  @Expose()
  @ApiProperty({ example: productDtoStub().updatedAt })
  updatedAt?: string;
}

export class CreateProductDto extends OmitType(ProductDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}

export class UpdateProductDto extends OmitType(ProductDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}
