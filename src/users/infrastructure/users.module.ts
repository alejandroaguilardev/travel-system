import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserModel, UserSchema } from './schema/user.schema';
import { UserMongoRepository } from './persistence/user-mongo.repository';
import { BcryptService } from '../../common/infrastructure/services/bcrypt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserMongoRepository, BcryptService],
})
export class UsersModule {}
