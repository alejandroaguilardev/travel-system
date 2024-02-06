import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserModel, UserSchema } from './schema/user.schema';
import { UserMongoRepository } from './persistence/user-mongo.repository';
import { BcryptService } from '../../common/infrastructure/services/bcrypt.service';
import { AuthModule } from '../../auth/infrastructure/auth.module';
import {
  RoleModel,
  RoleSchema,
} from '../../roles/infrastructure/schema/role.schema';
import {
  PermissionModel,
  PermissionSchema,
} from '../../permissions/infrastructure/schema/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PermissionModel.name, schema: PermissionSchema },
    ]),
    MongooseModule.forFeature([{ name: RoleModel.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserMongoRepository, BcryptService],
  exports: [UserMongoRepository],
})
export class UsersModule {}
