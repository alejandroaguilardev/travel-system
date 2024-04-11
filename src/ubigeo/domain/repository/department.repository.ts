import { DepartmentInterface } from '../interfaces/department.interface';
import { UbigeoId } from '../value-object/ubigeo-id';

export interface DepartmentRepository {
  searchById(id: UbigeoId): Promise<DepartmentInterface | null>;
  search(): Promise<DepartmentInterface[]>;
  saveSeeder(data: DepartmentInterface[]): Promise<void>;
}
