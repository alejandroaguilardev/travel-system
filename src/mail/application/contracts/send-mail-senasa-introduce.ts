import { UserEmail } from '../../../users/domain/value-object/user-email';
import { UserRepository } from '../../../users/domain/user.repository';
import { Uuid } from '../../../common/domain/value-object';
import { UserResponse } from '../../../users/domain/interfaces/user.response';
import { ContractDetailUpdaterResponse } from '../../../contract-detail/application/response/contract-detail-update.response';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from '../../../contract-detail/application/response/contract-detail.response';
import { DateService } from '../../../common/application/services/date-service';
import Template from '../../domain/contracts/senasa-introduce-template';

export class SendMailSenasaIntroduce {
  constructor(
    private readonly transporter: any,
    private readonly userRepository: UserRepository,
    private readonly dateService: DateService,
  ) {}

  async execute({
    contract,
    contractDetail,
  }: ContractDetailUpdaterResponse): Promise<void> {
    const clientId = new Uuid(contract.client.id);
    const adviserId = new Uuid(contract.adviser.id);
    const [user, adviser] = await Promise.all([
      this.userRepository.searchById<UserResponse>(clientId),
      this.userRepository.searchById<UserResponse>(adviserId),
    ]);

    const email = new UserEmail(user.email);

    await this.transporter.sendMail(
      this.options(
        email,
        contractDetail,
        await this.getHtml(contract, contractDetail, adviser.profile.phone),
      ),
    );
  }

  options(
    email: UserEmail,
    contractDetail: ContractDetailResponse,
    html: string,
  ) {
    return {
      from: `Pet travel <${process.env.MAIL_TO}>`,
      to: email.value,
      subject: `Pet Travel Contrato Inspección Senasa ${contractDetail.pet.name}`,
      html,
    };
  }

  async getHtml(
    contract: ContractResponse,
    contractDetail: ContractDetailResponse,
    phone: string,
  ) {
    return Template.replaceAll(
      '{{client}}',
      `${contract.client?.profile?.name ?? 'Cliente'} ${
        contract.client?.profile?.lastName ?? ''
      }`,
    )
      .replaceAll('{{pet.name}}', contractDetail.pet.name)
      .replaceAll('{{phone}}', phone)
      .replaceAll(
        '{{date}}',
        this.dateService.formatDateTime(
          contractDetail.documentation.senasaDocuments.executionDate,
          'DD/MM/YYYY',
        ),
      );
  }
}
