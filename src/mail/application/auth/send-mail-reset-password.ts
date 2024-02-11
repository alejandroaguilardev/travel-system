import { UserPassword } from '../../../users/domain/value-object/user-password';
import { UserEmail } from '../../../users/domain/value-object/user-email';
import { MailTemplate } from '../../domain/mail-template';
import { TemplateRoute } from '../../domain/template-routes';

export class SendMailResetPassword {
  constructor(private readonly transporter: any) {}

  async execute(email: UserEmail, password: UserPassword): Promise<void> {
    await this.transporter.sendMail(
      this.options(email, this.getHtml(password)),
    );
  }

  options(email: UserEmail, html: string) {
    return {
      from: `Pet travel <${process.env.MAIL_TO}>`,
      to: email.value,
      subject: 'Recuperar contraseña Pet Travel',
      html,
    };
  }

  getHtml(password: UserPassword) {
    return MailTemplate.loadTemplate(TemplateRoute.AUTH_RESET_PASSWORD).replace(
      '{{password}}',
      password.value,
    );
  }
}
