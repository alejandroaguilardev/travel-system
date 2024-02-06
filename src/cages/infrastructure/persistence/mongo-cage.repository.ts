import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CageRepository } from '../../domain/cage.repository';
import { Cage } from '../../domain/cage';
import { CageModel } from '../schema/cage.schema';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';

@Injectable()
export class MongoCageRepository
  extends MongoRepository<CageModel, Cage>
  implements CageRepository
{
  constructor(@InjectModel(CageModel.name) cageModel: Model<CageModel>) {
    super(cageModel);
  }
}
