import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/infrastructure/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/infrastructure/users.module';
import { RolesModule } from './roles/infrastructure/roles.module';
import { PermissionsModule } from './permissions/infrastructure/permissions.module';
import { BcryptService } from './common/infrastructure/services/bcrypt.service';
import { SeederModule } from './seeder/infrastructure/seeder.module';
import { ContractsModule } from './contracts/infrastructure/contracts.module';
import { CagesModule } from './cages/infrastructure/cages.module';
import { PetsModule } from './pets/infrastructure/pets.module';
import { ContractDetailModule } from './contract-detail/infrastructure/contract-detail.module';
import { FoldersModule } from './folders/infrastructure/folders.module';
import { UbigeoModule } from './ubigeo/infrastructure/ubigeo.module';
import { ScheduleCustomModule } from './schedule/infrastructure/schedule-custom.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    SeederModule,
    ContractsModule,
    CagesModule,
    PetsModule,
    ContractDetailModule,
    FoldersModule,
    UbigeoModule,
    ScheduleCustomModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [BcryptService],
})
export class AppModule {}
