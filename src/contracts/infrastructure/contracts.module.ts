import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractModel, ContractSchema } from './schema/contract.schema';
import { MongoContractRepository } from './persistence/contract-mongo.repository';
import { AuthModule } from '../../auth/infrastructure/auth.module';
import { MailModule } from '../../mail/infrastructure/mail.module';
import { ContractDetailService } from '../../contract-detail/infrastructure/contract-detail.service';
import { MongoContractDetailRepository } from '../../contract-detail/infrastructure/persistence/contract-detail-mongo.repository';
import {
  ContractDetailModel,
  ContractDetailSchema,
} from '../../contract-detail/infrastructure/schema/contract-detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContractModel.name, schema: ContractSchema },
    ]),
    MongooseModule.forFeature([
      { name: ContractDetailModel.name, schema: ContractDetailSchema },
    ]),
    AuthModule,
    MailModule,
  ],
  controllers: [ContractsController],
  providers: [
    ContractsService,
    MongoContractRepository,
    ContractDetailService,
    MongoContractDetailRepository,
  ],
  exports: [MongoContractRepository],
})
export class ContractsModule {}
