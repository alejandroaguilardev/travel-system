import { IsArray, IsNumber, IsOptional, IsString, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CriteriaRequest } from '../../application/criteria/criteria';
import { FilterRequest } from '../../application/criteria/filter';
import { SortingRequest } from '../../application/criteria/sorting';
import { GlobalFilterPropertiesRequest } from '../../application/criteria/global-filter-properties';

export class CriteriaDto implements CriteriaRequest {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  start: number = 0;

  @IsOptional()
  @IsNumber()
  @Max(10000)
  @Type(() => Number)
  size: number = 10;

  @IsOptional()
  @IsArray()
  @Transform(({ value }): FilterRequest[] => {
    if (typeof value === 'string') return JSON.parse(value);
    return [];
  })
  filters: FilterRequest[] = [];

  @IsOptional()
  @IsArray()
  @Transform(({ value }): SortingRequest[] => {
    if (typeof value === 'string') return JSON.parse(value);
    return [];
  })
  sorting: SortingRequest[] = [];

  @IsOptional()
  @IsString()
  globalFilter: string = '';

  @IsOptional()
  @IsArray()
  @Transform(({ value }): GlobalFilterPropertiesRequest[] => {
    if (typeof value === 'string') return JSON.parse(value);
    return [];
  })
  globalFilterProperties: GlobalFilterPropertiesRequest[] = [];

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }): GlobalFilterPropertiesRequest[] => {
    if (typeof value === 'string') return JSON.parse(value);
    return [];
  })
  selectProperties: string[] = [];
}
