import { UserPassword } from '../../../users/domain/value-object/user-password';
import { UserEmail } from '../../../users/domain/value-object/user-email';
import register from '../../domain/auth/register-template';
import { UserDocument } from '../../../users/domain/value-object/profile/user-document';
import { UserDocumentNumber } from '../../../users/domain/value-object/profile/user-document-number';

export class SendMailRegister {
  constructor(private readonly transporter: any) {}

  async execute(
    email: UserEmail,
    document: UserDocument,
    documentNumber: UserDocumentNumber,
    password: UserPassword,
  ): Promise<void> {
    await this.transporter.sendMail(
      this.options(email, this.getHtml(document, documentNumber, password)),
    );
  }

  options(email: UserEmail, html: string) {
    return {
      from: `Bienvenido  a Pet travel <${process.env.MAIL_TO}>`,
      to: email.value,
      subject: '¡Bienvenido! Acceda a Pet Travel con sus Credenciales',
      html,
    };
  }

  getHtml(
    document: UserDocument,
    documentNumber: UserDocumentNumber,
    password: UserPassword,
  ) {
    return register
      .replace('{{document}}', document.value)
      .replace('{{documentNumber}}', documentNumber.value)
      .replace('{{password}}', password.value);
  }
}
