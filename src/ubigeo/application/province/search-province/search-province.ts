import { UbigeoId } from '../../../domain/value-object/ubigeo-id';
import { ProvinceRepository } from '../../../domain/repository/province.repository';
import { ProvinceInterface } from '../../../domain/interfaces/province.interface';

export class SearchProvince {
  constructor(private readonly provinceRepository: ProvinceRepository) {}

  execute(id: UbigeoId): Promise<ProvinceInterface> {
    return this.provinceRepository.searchById(id);
  }
}
