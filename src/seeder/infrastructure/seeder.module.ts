import { Module } from '@nestjs/common';
import { UUIDService } from '../../common/infrastructure/services/uuid.service';
import { BcryptService } from '../../common/infrastructure/services/bcrypt.service';
import { UsersModule } from '../../users/infrastructure/users.module';
import { RolesModule } from '../../roles/infrastructure/roles.module';
import { PermissionsModule } from '../../permissions/permissions.module';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
  imports: [UsersModule, RolesModule, PermissionsModule],
  controllers: [SeederController],
  providers: [SeederService, UUIDService, BcryptService],
})
export class SeederModule {}
