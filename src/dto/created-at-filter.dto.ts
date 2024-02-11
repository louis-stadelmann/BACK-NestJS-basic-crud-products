import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export const FIELD_NAME_CREATED_AT = 'createdAt';

export class CreatedAtFilterDto {
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  createdAfter?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  createdBefore?: Date;
}
