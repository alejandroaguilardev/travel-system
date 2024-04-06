import { Module } from '@nestjs/common';
import { ContractDetailService } from './contract-detail.service';
import { ContractDetailController } from './contract-detail.controller';
import { MailModule } from '../../mail/infrastructure/mail.module';
import { AuthModule } from '../../auth/infrastructure/auth.module';
import { ContractsModule } from '../../contracts/infrastructure/contracts.module';
import { ContractDetailTopicoService } from './contract-detail-topico.service';
import { ContractDetailCertificateService } from './contract-detail-certificate.service';

@Module({
  imports: [AuthModule, MailModule, ContractsModule],
  controllers: [ContractDetailController],
  providers: [
    ContractDetailService,
    ContractDetailTopicoService,
    ContractDetailCertificateService,
  ],
  exports: [ContractDetailService],
})
export class ContractDetailModule {}
