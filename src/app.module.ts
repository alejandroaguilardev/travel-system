import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/infrastructure/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/infrastructure/users.module';
import { RolesModule } from './roles/infrastructure/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { BcryptService } from './common/infrastructure/services/bcrypt.service';
import { SeederModule } from './seeder/infrastructure/seeder.module';
import { ContractsModule } from './contracts/infrastructure/contracts.module';
import { CagesModule } from './cages/infrastructure/cages.module';

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
  ],
  controllers: [],
  providers: [BcryptService],
})
export class AppModule {}
