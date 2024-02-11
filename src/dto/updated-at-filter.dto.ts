import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export const FIELD_NAME_UPDATED_AT = 'updatedAt';

export class UpdatedAtFilterDto {
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  updatedAfter?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  updatedBefore?: Date;
}
