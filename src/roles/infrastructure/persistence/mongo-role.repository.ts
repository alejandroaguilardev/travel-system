import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { RoleRepository } from '../../domain/role.repository';
import { Role } from '../../domain/role';
import { RoleModel } from '../schema/role.schema';
import { RoleMongoPipeline } from './mongo-role-pipeline';

@Injectable()
export class MongoRoleRepository
  extends MongoRepository<RoleModel, Role>
  implements RoleRepository
{
  private roleModel: Model<RoleModel>;

  constructor(@InjectModel(RoleModel.name) model: Model<RoleModel>) {
    super(model);
    this.roleModel = model;
  }

  async searchByIdResponse<T>(id: Uuid): Promise<T | null> {
    const response = await this.roleModel
      .findOne({ id: id.value })
      .select(['-_id', '-__v', '-createdAt', '-updatedAt'])
      .lean();

    if (!response) return null;

    const rows = await this.roleModel.aggregate(
      RoleMongoPipeline.execute(id.value),
    );

    const role = rows?.length > 0 ? rows[0] : null;
    if (!role) return null;

    return role as T;
  }
}
