import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';
import { User } from '../../domain/user';
import { UserEmail } from '../../domain/value-object/user-email';
import { UserRepository } from '../../domain/user.repository';
import {
  UserResponse,
} from '../../domain/interfaces/user.response';
import { UserModel } from '../schema/user.schema';
import { UserMongoPipeline } from './user-mongo.pipeline';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';
import { FilterOperator } from '../../../common/domain/criteria/filter-operator';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserPassword } from '../../domain/value-object/user-password';
import { UserProfile } from '../../domain/value-object/user-profile';
import { UserDocument } from '../../domain/value-object/profile/user-document';
import { UserDocumentNumber } from '../../domain/value-object/profile/user-document-number';
import { UserInterface } from '../../domain/interfaces/user.interface';
import { UserWithoutWithRoleResponse } from '../../domain/interfaces/user-without.response';

@Injectable()
export class UserMongoRepository
  extends MongoRepository<UserModel, User>
  implements UserRepository {
  private userModel: Model<UserModel>;

  constructor(@InjectModel(UserModel.name) model: Model<UserModel>) {
    super(model);
    this.userModel = model;
  }

  async search<R>(criteria: Criteria): Promise<ResponseSearch<R>> {
    const results: any = await this.userModel
      .aggregate(UserMongoPipeline.execute(criteria))
      .exec();

    return { rows: results[0].rows, count: results[0].totalCount } as ResponseSearch<R>;
  }

  async searchEmail(email: UserEmail): Promise<UserResponse | null> {
    const response = await this.userModel.findOne({ email }).lean();
    if (!response) return null;

    const { id, password } = response;
    const criteria = CommandCriteria.fromData({
      filters: [{ field: 'id', value: id, operator: FilterOperator.EQUAL }],
    });
    const rows: UserResponse[] = await this.userModel
      .aggregate(UserMongoPipeline.execute(criteria))
      .exec();

    const user = rows.length > 0 ? rows[0] : null;
    return { ...user, password };
  }

  async searchDocument(
    document: UserDocument,
    documentNumber: UserDocumentNumber,
  ): Promise<UserInterface | null> {
    const response = await this.userModel
      .findOne({
        'profile.document': document.value,
        'profile.documentNumber': documentNumber.value,
      })
      .lean();
    if (!response) return null;
    return response;
  }

  async searchByIdWithRole(uuid: Uuid): Promise<UserWithoutWithRoleResponse | null> {
    const rows: UserWithoutWithRoleResponse[] = await this.userModel
      .aggregate(UserMongoPipeline.executeById(uuid.value))
      .exec();

    const user = rows.length > 0 ? rows[0] : null;
    if (!user) return null;

    return user;
  }

  async updatePassword(
    id: Uuid,
    password: UserPassword,
  ): Promise<UserResponse | null> {
    return this.userModel.findOneAndUpdate(
      { id: id.value },
      { password: password.value },
    );
  }
  async updateProfile(
    id: Uuid,
    userProfile: UserProfile,
  ): Promise<UserResponse | null> {
    return this.userModel.findOneAndUpdate(
      { id: id.value },
      { profile: userProfile.toJson() },
    );
  }
}
