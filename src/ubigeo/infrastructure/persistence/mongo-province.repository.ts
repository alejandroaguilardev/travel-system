import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UbigeoId } from '../../domain/value-object/ubigeo-id';
import { ProvinceInterface } from '../../domain/interfaces/province.interface';
import { ProvinceRepository } from '../../domain/repository/province.repository';
import { ProvinceModel } from '../schema/province.schema';

export class MongoProvinceRepository implements ProvinceRepository {
  private model: Model<ProvinceModel>;

  constructor(@InjectModel(ProvinceModel.name) model: Model<ProvinceModel>) {
    this.model = model;
  }

  searchById(id: UbigeoId): Promise<ProvinceInterface> {
    return this.model.findOne({ id: id.value });
  }

  async saveSeeder(data: ProvinceInterface[]): Promise<void> {
    this.model.insertMany(data);
  }
}
