import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import { MongoCriteriaConverter } from '../../../common/infrastructure/mongo/mongo-criteria-converter';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';
import { User } from '../../domain/user';
import { UserEmail } from '../../domain/user-email';
import { UserRepository } from '../../domain/user.repository';
import { UserResponse } from '../../application/response/user.response';
import { UserModel } from '../schema/user.schema';

@Injectable()
export class UserMongoRepository
  extends MongoRepository<UserModel, User>
  implements UserRepository
{
  private userModel: Model<UserModel>;

  constructor(@InjectModel(UserModel.name) model: Model<UserModel>) {
    super(model);
    this.userModel = model;
  }

  async search<R>(criteria: Criteria): Promise<ResponseSearch<R>> {
    const { query, selectProperties, start, size, sortQuery } =
      MongoCriteriaConverter.Converter(criteria);

    const rows: R[] = await this.userModel
      .find(query)
      .select([...selectProperties, '-_id', '-__v', '-password'])
      .skip(start)
      .limit(size)
      .sort(sortQuery)
      .lean();

    const count: number = await this.userModel.find().countDocuments();
    return { rows, count };
  }

  async searchEmail(email: UserEmail): Promise<UserResponse | null> {
    return this.userModel.findOne({ email }).select(['-_id', '-__v']).lean();
  }
}
