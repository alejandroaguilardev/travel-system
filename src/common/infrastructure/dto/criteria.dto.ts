import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
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
  @Type(() => Number)
  size: number = 10;
  @IsOptional()
  @IsArray()
  filters: FilterRequest[] = [];
  @IsOptional()
  @IsArray()
  sorting: SortingRequest[] = [];
  @IsOptional()
  @IsString()
  globalFilter: string = '';
  @IsOptional()
  @IsArray()
  globalFilterProperties: GlobalFilterPropertiesRequest[] = [];
  @IsOptional()
  @IsArray()
  selectProperties: string[] = [];
}
