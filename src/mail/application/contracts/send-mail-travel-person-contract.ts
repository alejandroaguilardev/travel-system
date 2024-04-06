import { UserEmail } from '../../../users/domain/value-object/user-email';
import { UserRepository } from '../../../users/domain/user.repository';
import { Uuid } from '../../../common/domain/value-object';
import { UserResponse } from '../../../users/domain/interfaces/user.response';
import { ContractDetailUpdaterResponse } from '../../../contract-detail/application/response/contract-detail-update.response';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from '../../../contract-detail/application/response/contract-detail.response';
import travelPersonContractTemplate from '../../domain/contracts/travel-person-contract-template';
import { JWT } from '../../../auth/application/services/jwt';

export class SendMailTravelPersonContract {
  constructor(
    private readonly transporter: any,
    private readonly userRepository: UserRepository,
    private readonly jwt: JWT,
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
        this.getHtml(contract, contractDetail, adviser.profile.phone),
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
      subject: `Pet Travel Documentación Actualizada de ${contractDetail.pet.name}`,
      html,
    };
  }

  getHtml(
    contract: ContractResponse,
    contractDetail: ContractDetailResponse,
    phone: string,
  ) {
    const token = this.jwt.generateToken({ id: contract.client });

    const template = travelPersonContractTemplate
      .replaceAll('{{number_contract}}', contract.number)
      .replaceAll('{{pet.name}}', contractDetail.pet.name)
      .replaceAll('{{phone}}', phone)
      .replaceAll('{{contractId}}', contract.id)
      .replaceAll('{{contractDetailId}}', contractDetail.id)
      .replaceAll('{{token}}', token);
    return template;
  }
}
