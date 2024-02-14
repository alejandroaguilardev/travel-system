import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { SendMailNewContract } from '../application/contracts/send-mail-new-contract';
import { ContractInterface } from '../../contracts/domain/interfaces/contract.interface';
import { UserEmail } from '../../users/domain/value-object/user-email';
import { CommandContractUpdater } from '../../contracts/application/update/command-contract-updater';

@Injectable()
export class MailContractService {
  private mailerService: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  private isProductionMode: string;

  constructor() {
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

  async new(email: string, contractJson: ContractInterface): Promise<void> {
    if (this.isProductionMode === 'false') return;

    const sendEmail = new SendMailNewContract(this.mailerService);
    const contract = CommandContractUpdater.execute(contractJson);
    await sendEmail.execute(new UserEmail(email), contract);
  }
}
