import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailAuthService } from './mail-auth.service';
import { MailContractService } from './mail-contract.service';
import { UserMongoRepository } from '../../users/infrastructure/persistence/user-mongo.repository';
import {
  UserModel,
  UserSchema,
} from '../../users/infrastructure/schema/user.schema';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [
    MailAuthService,
    MailContractService,
    UserMongoRepository,
    DayJsService,
  ],
  exports: [MailAuthService, MailContractService],
})
export class MailModule {}
