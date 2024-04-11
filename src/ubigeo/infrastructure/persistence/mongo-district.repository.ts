import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UbigeoId } from '../../domain/value-object/ubigeo-id';
import { DistrictInterface } from '../../domain/interfaces/district.interface';
import { DistrictRepository } from '../../domain/repository/district.repository';
import { DistrictModel } from '../schema/district.schema';

export class MongoDistrictRepository implements DistrictRepository {
  private model: Model<DistrictModel>;

  constructor(@InjectModel(DistrictModel.name) model: Model<DistrictModel>) {
    this.model = model;
  }

  searchById(id: UbigeoId): Promise<DistrictInterface> {
    return this.model.findOne({ id: id.value });
  }

  async saveSeeder(data: DistrictInterface[]): Promise<void> {
    this.model.insertMany(data);
  }
}
