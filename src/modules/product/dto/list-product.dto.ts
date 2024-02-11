import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { CreatedAtFilterDto } from '../../../dto/created-at-filter.dto';
import { UpdatedAtFilterDto } from '../../../dto/updated-at-filter.dto';
import { PaginationDto } from '../../../dto/pagination.dto';
import { CategoryEnum } from '../../category/category.enum';

export class ListProductDto extends IntersectionType(
  PaginationDto,
  CreatedAtFilterDto,
  UpdatedAtFilterDto,
) {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Monitor' })
  name?: string;

  @IsEnum(CategoryEnum)
  @IsOptional()
  @ApiPropertyOptional({ example: CategoryEnum.CATEGORY_3 })
  category?: CategoryEnum;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @ApiPropertyOptional({ example: 0 })
  priceMin?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ example: 20 })
  priceMax?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @ApiPropertyOptional({ example: 0 })
  quantityMin?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ example: 20 })
  quantityMax?: number;
}
