import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptService } from '../../common/infrastructure/services/bcrypt.service';
import {
  UserModel,
  UserSchema,
} from '../../users/infrastructure/schema/user.schema';
import { UserMongoRepository } from '../../users/infrastructure/persistence/user-mongo.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTAdapterService } from './services/jwt.service';
import { JwtStrategyService } from './services/jwt-strategy.service';
import { MailModule } from '../../mail/infrastructure/mail.module';

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
          expiresIn: '12h',
        },
      }),
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserMongoRepository,
    BcryptService,
    JWTAdapterService,
    JwtStrategyService,
  ],
  exports: [JwtStrategyService, PassportModule, JwtModule],
})
export class AuthModule {}
