import { UbigeoId } from '../../../domain/value-object/ubigeo-id';
import { DepartmentRepository } from '../../../domain/repository/department.repository';
import { DepartmentInterface } from '../../../domain/interfaces/department.interface';

export class SearchDepartment {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  execute(id: UbigeoId): Promise<DepartmentInterface> {
    return this.departmentRepository.searchById(id);
  }
}
