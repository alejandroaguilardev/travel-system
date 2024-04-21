import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { SendMailRegister } from '../application/auth/send-mail-register';
import { UserEmail } from '../../users/domain/value-object/user-email';
import { UserPassword } from '../../users/domain/value-object/user-password';
import { SendMailResetPassword } from '../application/auth/send-mail-reset-password';
import { UserDocument } from '../../users/domain/value-object/profile/user-document';
import { UserDocumentNumber } from '../../users/domain/value-object/profile/user-document-number';

@Injectable()
export class MailAuthService {
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

  async register(
    email: UserEmail,
    document: UserDocument,
    documentNumber: UserDocumentNumber,
    password: UserPassword,
  ): Promise<void> {
    if (this.getProductionMode()) return;

    const sendEmail = new SendMailRegister(this.mailerService);
    await sendEmail.execute(email, document, documentNumber, password);
  }

  async recover(email: UserEmail, token: string): Promise<void> {
    if (this.getProductionMode()) return;

    const sendEmail = new SendMailResetPassword(this.mailerService);
    await sendEmail.execute(email, token);
  }

  private getProductionMode() {
    return this.isProductionMode === 'false';
  }
}
