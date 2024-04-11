import { DepartmentRepository } from '../../../ubigeo/domain/repository/department.repository';
import { ProvinceRepository } from '../../../ubigeo/domain/repository/province.repository';
import { DistrictRepository } from '../../../ubigeo/domain/repository/district.repository';
import { departmentData } from '../../domain/departments-data';
import { provinceData } from '../../domain/provinces-data';
import { districtsData } from '../../domain/districts-data';

export class UbigeoSeeder {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private readonly provinceRepository: ProvinceRepository,
    private readonly districtRepository: DistrictRepository,
  ) {}

  async execute(): Promise<void> {
    if ((await this.departmentRepository.search()).length > 0) {
      return;
    }

    await Promise.all([
      this.departmentRepository.saveSeeder(departmentData),
      this.provinceRepository.saveSeeder(provinceData),
      this.districtRepository.saveSeeder(districtsData),
    ]);
  }
}
