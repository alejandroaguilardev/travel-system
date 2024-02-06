import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionModel, PermissionSchema } from './schema/permission.schema';
import { MongoPermissionRepository } from './persistence/mongo-permission.repository';
import { AuthModule } from '../../auth/infrastructure/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PermissionModel.name, schema: PermissionSchema },
    ]),
    AuthModule,
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, MongoPermissionRepository],
  exports: [MongoPermissionRepository],
})
export class PermissionsModule {}
