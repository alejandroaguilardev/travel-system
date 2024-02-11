import { UserPassword } from '../../../users/domain/value-object/user-password';
import { UserEmail } from '../../../users/domain/value-object/user-email';
import { MailTemplate } from '../../domain/mail-template';
import { TemplateRoute } from '../../domain/template-routes';

export class SendMailRegister {
  constructor(private readonly transporter: any) {}

  async execute(email: UserEmail, password: UserPassword): Promise<void> {
    await this.transporter.sendMail(
      this.options(email, this.getHtml(email, password)),
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

  getHtml(email: UserEmail, password: UserPassword) {
    return MailTemplate.loadTemplate(TemplateRoute.AUTH_REGISTER)
      .replace('{{email}}', email.value)
      .replace('{{password}}', password.value);
  }
}
