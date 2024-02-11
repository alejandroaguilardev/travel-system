import { UserEmail } from '../../../users/domain/value-object/user-email';
import { Contract } from '../../../contracts/domain/contract';
import { MailTemplate } from '../../domain/mail-template';
import { TemplateRoute } from '../../domain/template-routes';

export class SendMailNewContract {
  constructor(private readonly transporter: any) {}

  async execute(email: UserEmail, contract: Contract): Promise<void> {
    await this.transporter.sendMail(
      this.options(email, contract, this.getHtml(contract)),
    );
  }

  options(email: UserEmail, contract: Contract, html: string) {
    return {
      from: `Pet travel <${process.env.MAIL_TO}>`,
      to: email.value,
      subject: `Pet Travel Contrato Nª ${contract.number.value}`,
      html,
    };
  }

  getHtml(contract: Contract) {
    return MailTemplate.loadTemplate(TemplateRoute.AUTH_REGISTER).replaceAll(
      '{{number_contract}}',
      contract.number.value,
    );
  }
}
