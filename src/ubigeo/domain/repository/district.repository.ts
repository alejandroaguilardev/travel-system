import { DistrictInterface } from '../interfaces/district.interface';
import { UbigeoId } from '../value-object/ubigeo-id';

export interface DistrictRepository {
  searchById(id: UbigeoId): Promise<DistrictInterface | null>;
  saveSeeder(data: DistrictInterface[]): Promise<void>;
}
