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
import { IncidentsModule } from './errors/infrastructure/incidents.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/infrastructure/config/global-filter';
import { IncidentsService } from './errors/infrastructure/incidents.service';
import { UUIDService } from './common/infrastructure/services/uuid.service';
import { LaravelApiAdapter } from './common/infrastructure/services/laravel-adapter.service';
import { GlobalPipes } from './common/infrastructure/config/global-pipes';

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
    IncidentsModule,
  ],
  controllers: [],
  providers: [
    BcryptService,
    IncidentsService,
    UUIDService,
    LaravelApiAdapter,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: GlobalPipes.getGlobal(),
    },
  ],
})
export class AppModule {}
