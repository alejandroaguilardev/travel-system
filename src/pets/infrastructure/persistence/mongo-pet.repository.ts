import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PetRepository } from '../../domain/pet.repository';
import { Pet } from '../../domain/pet';
import { PetModel } from '../schema/pet.schema';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';
import { PetChip } from '../../domain/value-object/pet-chip';
import { PetResponse } from '../../../pets/domain/interfaces/pet.response';

@Injectable()
export class MongoPetRepository
  extends MongoRepository<PetModel, Pet>
  implements PetRepository
{
  private petModel: Model<PetModel>;

  constructor(@InjectModel(PetModel.name) model: Model<PetModel>) {
    super(model);
    this.petModel = model;
  }

  async searchByChip(chip: PetChip): Promise<PetResponse | null> {
    return await this.petModel
      .findOne({ chip: chip.value })
      .select(['-_id', '-__v', '-createdAt', '-updatedAt'])
      .lean();
  }
}
