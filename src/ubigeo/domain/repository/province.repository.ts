import { ProvinceInterface } from '../interfaces/province.interface';
import { UbigeoId } from '../value-object/ubigeo-id';

export interface ProvinceRepository {
  searchById(id: UbigeoId): Promise<ProvinceInterface | null>;
  saveSeeder(data: ProvinceInterface[]): Promise<void>;
}
