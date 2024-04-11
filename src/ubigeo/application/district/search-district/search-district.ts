import { UbigeoId } from '../../../domain/value-object/ubigeo-id';
import { DistrictRepository } from '../../../domain/repository/district.repository';
import { DistrictInterface } from '../../../domain/interfaces/district.interface';

export class SearchDistrict {
  constructor(private readonly districtRepository: DistrictRepository) {}

  execute(id: UbigeoId): Promise<DistrictInterface> {
    return this.districtRepository.searchById(id);
  }
}
