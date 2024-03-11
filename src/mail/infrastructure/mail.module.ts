import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailAuthService } from './mail-auth.service';
import { MailContractService } from './mail-contract.service';
import { UserMongoRepository } from '../../users/infrastructure/persistence/user-mongo.repository';
import {
  UserModel,
  UserSchema,
} from '../../users/infrastructure/schema/user.schema';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';
import { JWTAdapterService } from '../../auth/infrastructure/services/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: '57h',
        },
      }),
    }),
  ],
  controllers: [],
  providers: [
    MailAuthService,
    MailContractService,
    UserMongoRepository,
    DayJsService,
    JWTAdapterService,
  ],
  exports: [MailAuthService, MailContractService],
})
export class MailModule {}
