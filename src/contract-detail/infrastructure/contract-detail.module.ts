import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ContractDetailService } from './contract-detail.service';
import { ContractDetailController } from './contract-detail.controller';
import { MailModule } from '../../mail/infrastructure/mail.module';
import { AuthModule } from '../../auth/infrastructure/auth.module';
import {
  ContractDetailModel,
  ContractDetailSchema,
} from './schema/contract-detail.schema';
import { MongoContractDetailRepository } from './persistence/contract-mongo.repository';
import { ContractsModule } from '../../contracts/infrastructure/contracts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContractDetailModel.name, schema: ContractDetailSchema },
    ]),
    AuthModule,
    MailModule,
    ContractsModule,
  ],
  controllers: [ContractDetailController],
  providers: [ContractDetailService, MongoContractDetailRepository],
  exports: [MongoContractDetailRepository],
})
export class ContractDetailModule {}
