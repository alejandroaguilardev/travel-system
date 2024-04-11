import { DepartmentInterface } from './department.interface';
import { DistrictInterface } from './district.interface';
import { ProvinceInterface } from './province.interface';

export interface UbigeoQueryInterface {
  findOneDepartment(id: string): Promise<DepartmentInterface>;
  findOneProvince(id: string): Promise<ProvinceInterface>;
  findOneDistrict(id: string): Promise<DistrictInterface>;
}
