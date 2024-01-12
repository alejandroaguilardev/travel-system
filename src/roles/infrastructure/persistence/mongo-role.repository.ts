import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';
import { RoleRepository } from '../../domain/role.repository';
import { RoleModel } from '../schema/role.schema';
import { Role } from '../../domain/role';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MongoRoleRepository
  extends MongoRepository<RoleModel, Role>
  implements RoleRepository
{
  constructor(@InjectModel(RoleModel.name) roleModel: Model<RoleModel>) {
    super(roleModel);
  }
}
