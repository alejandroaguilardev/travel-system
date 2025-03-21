import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { RolesController } from '../infrastructure/roles.controller';
import { MongoRoleRepository } from './persistence/mongo-role.repository';
import { RoleModel, RoleSchema } from './schema/role.schema';
import { AuthModule } from '../../auth/infrastructure/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoleModel.name, schema: RoleSchema }]),
    AuthModule,
  ],
  controllers: [RolesController],
  providers: [RolesService, MongoRoleRepository],
  exports: [MongoRoleRepository],
})
export class RolesModule {}
