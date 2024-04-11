import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UbigeoId } from '../../domain/value-object/ubigeo-id';
import { DepartmentInterface } from '../../domain/interfaces/department.interface';
import { DepartmentRepository } from '../../domain/repository/department.repository';
import { DepartmentModel } from '../schema/department.schema';

export class MongoDepartmentRepository implements DepartmentRepository {
  private model: Model<DepartmentModel>;

  constructor(
    @InjectModel(DepartmentModel.name) model: Model<DepartmentModel>,
  ) {
    this.model = model;
  }

  searchById(id: UbigeoId): Promise<DepartmentInterface> {
    return this.model.findOne({ id: id.value });
  }

  async saveSeeder(data: DepartmentInterface[]): Promise<void> {
    this.model.insertMany(data);
  }

  search(): Promise<DepartmentInterface[]> {
    return this.model.find();
  }
}
