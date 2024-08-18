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
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/infrastructure/config/global-filter';
import { UUIDService } from './common/infrastructure/services/uuid.service';
import { LaravelApiAdapter } from './common/infrastructure/services/laravel-adapter.service';
import { GlobalPipes } from './common/infrastructure/config/global-pipes';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 15,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 150
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 800
      }
    ]),
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    UUIDService,
    {
      provide: APP_PIPE,
      useValue: GlobalPipes.getGlobal(),
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    BcryptService,
    LaravelApiAdapter,
  ],
})
export class AppModule {
}
