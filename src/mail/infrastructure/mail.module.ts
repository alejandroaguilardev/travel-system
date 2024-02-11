import { Module } from '@nestjs/common';
import { MailAuthService } from './mail-auth.service';
import { MailContractService } from './mail-contract.service';

@Module({
  controllers: [],
  providers: [MailAuthService, MailContractService],
  exports: [MailAuthService, MailContractService],
})
export class MailModule {}
