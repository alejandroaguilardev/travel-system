import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractModel, ContractSchema } from './schema/contract.schema';
import { MongoContractRepository } from './persistence/contract-mongo.repository';
import { AuthModule } from '../../auth/infrastructure/auth.module';
import { MailModule } from '../../mail/infrastructure/mail.module';
import { AxiosAdapter } from '../../common/infrastructure/services/http.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContractModel.name, schema: ContractSchema },
    ]),
    AuthModule,
    MailModule,
  ],
  controllers: [ContractsController],
  providers: [ContractsService, MongoContractRepository, AxiosAdapter],
  exports: [MongoContractRepository],
})
export class ContractsModule {}
