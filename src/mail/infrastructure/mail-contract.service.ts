import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { SendMailNewContract } from '../application/contracts/send-mail-new-contract';
import { Contract } from '../../contracts/domain/contract';
import { UserMongoRepository } from '../../users/infrastructure/persistence/user-mongo.repository';
import { ContractDetailUpdaterResponse } from '../../contract-detail/application/response/contract-detail-update.response';
import { SendMailUpdateDocumentation } from '../application/contracts/send-mail-documentation';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';
import { SendMailTravelPersonContract } from '../application/contracts/send-mail-travel-person-contract';
import { JWTAdapterService } from '../../auth/infrastructure/services/jwt.service';

@Injectable()
export class MailContractService {
  private mailerService: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  private isProductionMode: string;

  constructor(
    private readonly userMongoRepository: UserMongoRepository,
    private readonly dayJsService: DayJsService,
    private readonly jwtService: JWTAdapterService,
  ) {
    this.mailerService = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_TO,
        pass: process.env.MAIL_PASSWORD,
      },
      secure: true,
      port: Number(process.env.MAIL_PORT),
    });
    this.isProductionMode = process.env.PRODUCTION;
  }

  async new(contract: Contract): Promise<void> {
    if (this.getProductionMode()) return;

    const sendEmail = new SendMailNewContract(
      this.mailerService,
      this.userMongoRepository,
    );
    await sendEmail.execute(contract);
  }

  async updateDocumentation(
    data: ContractDetailUpdaterResponse,
  ): Promise<void> {
    if (this.getProductionMode()) return;

    const sendEmail = new SendMailUpdateDocumentation(
      this.mailerService,
      this.userMongoRepository,
      this.dayJsService,
    );
    await sendEmail.execute(data);
  }

  async travelPersonContract(
    data: ContractDetailUpdaterResponse,
  ): Promise<void> {
    if (this.getProductionMode()) return;

    const sendEmail = new SendMailTravelPersonContract(
      this.mailerService,
      this.userMongoRepository,
      this.jwtService,
    );

    await sendEmail.execute(data);
  }

  private getProductionMode() {
    return this.isProductionMode === 'false';
  }
}
