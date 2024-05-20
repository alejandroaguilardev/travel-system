import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';
import { ErrorModel } from '../schema/incident.schema';
import { ErrorRepository } from '../../domain/incident-repository';
import { Incident } from '../../domain/incidents';

@Injectable()
export class MongoIncidentRepository
  extends MongoRepository<ErrorModel, Incident>
  implements ErrorRepository
{
  constructor(
    @InjectModel(ErrorModel.name) readonly errorModel: Model<ErrorModel>,
  ) {
    super(errorModel);
  }
}
