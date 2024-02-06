import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PetRepository } from '../../domain/pet.repository';
import { Pet } from '../../domain/pet';
import { PetModel } from '../schema/pet.schema';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';

@Injectable()
export class MongoPetRepository
  extends MongoRepository<PetModel, Pet>
  implements PetRepository
{
  constructor(@InjectModel(PetModel.name) petModel: Model<PetModel>) {
    super(petModel);
  }
}
