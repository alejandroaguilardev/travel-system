import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PermissionModel,
  PermissionSchema,
} from './infrastructure/schema/permission.schema';
import { MongoPermissionRepository } from './infrastructure/persistence/mongo-permission.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PermissionModel.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, MongoPermissionRepository],
  exports: [MongoPermissionRepository],
})
export class PermissionsModule {}
