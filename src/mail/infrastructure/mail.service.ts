import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { SendEmail } from '../application/send-email';

@Injectable()
export class MailService {
  private mailerService: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.mailerService = nodemailer.createTransport({
      auth: {
        user: process.env.MAIL_TO,
        pass: process.env.MAIL_PASSWORD,
      },
      secure: true,
      port: Number(process.env.MAIL_PORT),
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html: string,
    attachments?: { filename: string; path: string }[],
  ): Promise<void> {
    const sendEmail = new SendEmail(this.mailerService);
    await sendEmail.execute(to, subject, text, html, attachments);
  }
}
