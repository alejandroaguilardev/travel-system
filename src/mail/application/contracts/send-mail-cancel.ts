import { UserEmail } from '../../../users/domain/value-object/user-email';
import { UserRepository } from '../../../users/domain/user.repository';
import { UserResponse } from '../../../users/domain/interfaces/user.response';
import Template from '../../domain/contracts/contract-cancel-template';
import { Contract } from '../../../contracts/domain/contract';
import { ContractReasonForCancellation } from '../../../contracts/domain/value-object/reason-for-cancellation';

export class SendMailCancelContract {
  constructor(
    private readonly transporter: any,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    contract: Contract,
    reasonForCancellation: ContractReasonForCancellation,
  ): Promise<void> {
    const [user, adviser] = await Promise.all([
      this.userRepository.searchById<UserResponse>(contract.client),
      this.userRepository.searchById<UserResponse>(contract.adviser),
    ]);

    const email = new UserEmail(user.email);

    await this.transporter.sendMail(
      this.options(
        email,
        this.getHtml(user, adviser.profile.phone, reasonForCancellation),
      ),
    );
  }

  options(email: UserEmail, html: string) {
    return {
      from: `Pet travel <${process.env.MAIL_TO}>`,
      to: email.value,
      subject: `Notificación de Cancelación de Contrato en Pet Travel`,
      html,
    };
  }

  getHtml(
    user: UserResponse,
    phone: string,
    reasonForCancellation: ContractReasonForCancellation,
  ) {
    return Template.replaceAll(
      '{{client}}',
      `${user?.profile?.name ?? 'Cliente'} ${user?.profile?.lastName ?? ''}`,
    )
      .replaceAll('{{phone}}', phone)
      .replaceAll('{{reasonForCancellation}}', reasonForCancellation.value);
  }
}
