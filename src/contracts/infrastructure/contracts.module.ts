import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractModel, ContractSchema } from './schema/contract.schema';
import { MongoContractRepository } from './persistence/contract-mongo.repository';
import { AuthModule } from '../../auth/infrastructure/auth.module';
import { LaravelApiAdapter } from '../../common/infrastructure/services/mail-api-adapter.service';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContractModel.name, schema: ContractSchema },
    ]),
    AuthModule,
  ],
  controllers: [ContractsController],
  providers: [
    ContractsService,
    MongoContractRepository,
    LaravelApiAdapter,
    DayJsService,
  ],
  exports: [MongoContractRepository],
})
export class ContractsModule {}
