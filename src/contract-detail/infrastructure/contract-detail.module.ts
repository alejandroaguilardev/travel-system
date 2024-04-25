import { Module } from '@nestjs/common';
import { ContractDetailService } from './contract-detail.service';
import { ContractDetailController } from './contract-detail.controller';
import { AuthModule } from '../../auth/infrastructure/auth.module';
import { ContractsModule } from '../../contracts/infrastructure/contracts.module';
import { ContractDetailTopicoService } from './contract-detail-topico.service';
import { ContractDetailCertificateService } from './contract-detail-certificate.service';
import { UbigeoModule } from '../../ubigeo/infrastructure/ubigeo.module';
import { JWTAdapterService } from '../../auth/infrastructure/services/jwt.service';
import { MailApiAdapter } from '../../common/infrastructure/services/mail-api-adapter.service';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';

@Module({
  imports: [AuthModule, ContractsModule, UbigeoModule],
  controllers: [ContractDetailController],
  providers: [
    ContractDetailService,
    ContractDetailTopicoService,
    ContractDetailCertificateService,
    JWTAdapterService,
    MailApiAdapter,
    DayJsService,
  ],
  exports: [ContractDetailService],
})
export class ContractDetailModule {}
