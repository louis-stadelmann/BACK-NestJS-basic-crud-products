import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TransformToObject } from '../utils/transform-parse.transformer';

export enum SortOrder {
  ASC = 1,
  DESC = -1,
}

export type SortOptions = { [key: string]: SortOrder };

export class PaginationDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiPropertyOptional()
  offset: number = 0;

  @IsPositive()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiPropertyOptional()
  limit: number = 100;

  @IsObject()
  @IsOptional()
  @TransformToObject()
  sort?: SortOptions;
}
