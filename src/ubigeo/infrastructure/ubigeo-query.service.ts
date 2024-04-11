import { Injectable } from '@nestjs/common';
import { MongoDistrictRepository } from './persistence/mongo-district.repository';
import { MongoDepartmentRepository } from './persistence/mongo-department.repository';
import { MongoProvinceRepository } from './persistence/mongo-province.repository';
import { SearchDepartment } from '../application/department/search-department/search-department';
import { UbigeoId } from '../domain/value-object/ubigeo-id';
import { SearchProvince } from '../application/province/search-province/search-province';
import { SearchDistrict } from '../application/district/search-district/search-district';
import { DepartmentInterface } from '../domain/interfaces/department.interface';
import { ProvinceInterface } from '../domain/interfaces/province.interface';
import { DistrictInterface } from '../domain/interfaces/district.interface';
import { UbigeoQueryInterface } from '../domain/interfaces/ubigeo-query.interface';

@Injectable()
export class UbigeoQuery implements UbigeoQueryInterface {
  constructor(
    private readonly mongoDepartmentRepository: MongoDepartmentRepository,
    private readonly mongoProvinceRepository: MongoProvinceRepository,
    private readonly mongoDistrictRepository: MongoDistrictRepository,
  ) {}

  findOneDepartment(id: string): Promise<DepartmentInterface> {
    const searchDepartment = new SearchDepartment(
      this.mongoDepartmentRepository,
    );
    return searchDepartment.execute(new UbigeoId(id));
  }

  findOneProvince(id: string): Promise<ProvinceInterface> {
    const searchProvince = new SearchProvince(this.mongoProvinceRepository);
    return searchProvince.execute(new UbigeoId(id));
  }
  findOneDistrict(id: string): Promise<DistrictInterface> {
    const searchDistrict = new SearchDistrict(this.mongoDistrictRepository);
    return searchDistrict.execute(new UbigeoId(id));
  }
}
