import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { SendMailNewContract } from '../application/contracts/send-mail-new-contract';
import { Contract } from '../../contracts/domain/contract';
import { UserMongoRepository } from '../../users/infrastructure/persistence/user-mongo.repository';
import { ContractDetailUpdaterResponse } from '../../contract-detail/application/response/contract-detail-update.response';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';
import { SendMailTravelPersonContract } from '../application/contracts/send-mail-travel-person-contract';
import { JWTAdapterService } from '../../auth/infrastructure/services/jwt.service';
import { SendMailUpdateDetail } from '../application/contracts/send-mail-detail';
import { UbigeoQuery } from '../../ubigeo/infrastructure/ubigeo-query.service';
import { SendMailSenasaIntroduce } from '../application/contracts/send-mail-senasa-introduce';
import { SendMailFinishContract } from '../application/contracts/send-mail-finish';
import { SendMailCancelContract } from '../application/contracts/send-mail-cancel';
import { ContractReasonForCancellation } from '../../contracts/domain/value-object/reason-for-cancellation';

@Injectable()
export class MailContractService {
  private mailerService: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  private isProductionMode: string;

  constructor(
    private readonly userMongoRepository: UserMongoRepository,
    private readonly dayJsService: DayJsService,
    private readonly jwtService: JWTAdapterService,
    private readonly ubigeoQuery: UbigeoQuery,
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

  async updateDetail(data: ContractDetailUpdaterResponse): Promise<void> {
    if (this.getProductionMode()) return;

    const sendEmail = new SendMailUpdateDetail(
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
      this.ubigeoQuery,
    );

    await sendEmail.execute(data);
  }

  async senasaIntroduceContract(
    data: ContractDetailUpdaterResponse,
  ): Promise<void> {
    if (this.getProductionMode()) return;

    const sendEmail = new SendMailSenasaIntroduce(
      this.mailerService,
      this.userMongoRepository,
      this.dayJsService,
    );

    await sendEmail.execute(data);
  }

  async contractFinish(contract: Contract): Promise<void> {
    if (this.getProductionMode()) return;
    const sendEmail = new SendMailFinishContract(
      this.mailerService,
      this.userMongoRepository,
    );

    await sendEmail.execute(contract);
  }

  async contractCancel(
    contract: Contract,
    reasonForCancellation: ContractReasonForCancellation,
  ): Promise<void> {
    if (this.getProductionMode()) return;
    const sendEmail = new SendMailCancelContract(
      this.mailerService,
      this.userMongoRepository,
    );

    await sendEmail.execute(contract, reasonForCancellation);
  }

  private getProductionMode() {
    return this.isProductionMode === 'false';
  }
}
