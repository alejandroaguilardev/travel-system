import { UserEmail } from '../../../users/domain/value-object/user-email';
import { Contract } from '../../../contracts/domain/contract';
import { MailTemplate } from '../../domain/mail-template';
import { TemplateRoute } from '../../domain/template-routes';
import { UserRepository } from '../../../users/domain/user.repository';
import { Uuid } from '../../../common/domain/value-object';
import { UserResponse } from '../../../users/domain/interfaces/user.response';

export class SendMailNewContract {
  constructor(
    private readonly transporter: any,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string, contract: Contract): Promise<void> {
    const uuid = new Uuid(userId);
    const [user, adviser] = await Promise.all([
      this.userRepository.searchById<UserResponse>(uuid),
      this.userRepository.searchById<UserResponse>(contract.adviser),
    ]);

    const email = new UserEmail(user.email);

    await this.transporter.sendMail(
      this.options(
        email,
        contract,
        this.getHtml(contract, adviser.profile.phone),
      ),
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

  getHtml(contract: Contract, phone: string) {
    return MailTemplate.loadTemplate(TemplateRoute.CONTRACT_NEW)
      .replaceAll('{{number_contract}}', contract.number.value)
      .replaceAll('{{phone}}', phone);
  }
}
