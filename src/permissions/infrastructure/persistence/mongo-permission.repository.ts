import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionRepository } from '../../domain/permission.repository';
import { Permission } from '../../domain/permission';
import { PermissionModel } from '../schema/permission.schema';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';

@Injectable()
export class MongoPermissionRepository
  extends MongoRepository<PermissionModel, Permission>
  implements PermissionRepository
{
  constructor(
    @InjectModel(PermissionModel.name) permissionModel: Model<PermissionModel>,
  ) {
    super(permissionModel);
  }
}
