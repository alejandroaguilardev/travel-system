import resetPasswordTemplate from '../../domain/auth/reset-password-template';
import { UserEmail } from '../../../users/domain/value-object/user-email';

export class SendMailResetPassword {
  constructor(private readonly transporter: any) {}

  async execute(email: UserEmail, token: string): Promise<void> {
    await this.transporter.sendMail(this.options(email, this.getHtml(token)));
  }

  options(email: UserEmail, html: string) {
    return {
      from: `Pet travel <${process.env.MAIL_TO}>`,
      to: email.value,
      subject: 'Recuperar contraseña Pet Travel',
      html,
    };
  }

  getHtml(token: string) {
    return resetPasswordTemplate.replace('{{token}}', token);
  }
}
