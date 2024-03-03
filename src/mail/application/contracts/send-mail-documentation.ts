import { UserEmail } from '../../../users/domain/value-object/user-email';
import { MailTemplate } from '../../domain/mail-template';
import { TemplateRoute } from '../../domain/template-routes';
import { UserRepository } from '../../../users/domain/user.repository';
import { Uuid } from '../../../common/domain/value-object';
import { UserResponse } from '../../../users/domain/interfaces/user.response';
import { ContractDetailUpdaterResponse } from '../../../contract-detail/application/response/contract-detail-update.response';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from '../../../contract-detail/application/response/contract-detail.response';
import { DateService } from '../../../common/application/services/date-service';

export class SendMailUpdateDocumentation {
  constructor(
    private readonly transporter: any,
    private readonly userRepository: UserRepository,
    private readonly dateService: DateService,
  ) {}

  async execute({
    contract,
    contractDetail,
  }: ContractDetailUpdaterResponse): Promise<void> {
    const clientId = new Uuid(contract.client);
    const adviserId = new Uuid(contract.adviser);
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
    const { documentation } = contractDetail;
    const names = this.getDocumentation();

    let template = MailTemplate.loadTemplate(TemplateRoute.UPDATE_DOCUMENTATION)
      .replaceAll('{{number_contract}}', contract.number)
      .replaceAll('{{pet.name}}', contractDetail.pet.name)
      .replaceAll('{{phone}}', phone);

    names.forEach(({ name }) => {
      template = template
        .replaceAll(
          `{{${name}.hasServiceIncluded}}`,
          documentation[name].hasServiceIncluded ? 'SI' : 'NO',
        )
        .replaceAll(
          `{{${name}.date}}`,
          documentation[name].executionDate
            ? this.dateService.formatDateTime(
                documentation[name].executionDate,
                'DD/MM/YYYY',
              )
            : '--',
        )
        .replaceAll(
          `{{${name}.isApplied}}`,
          `${documentation[name].isApplied ? 'Completado' : 'Pendiente'}`,
        )
        .replaceAll(
          `${name}_color`,
          `${documentation[name].isApplied ? '#98fb98' : '#f08080'}`,
        );
    });
    return template;
  }

  private getDocumentation() {
    return [
      {
        name: 'chipCertificate',
      },
      {
        name: 'vaccinationCertificate',
      },
      {
        name: 'rabiesSeroLogicalTest',
      },
      {
        name: 'chipReview',
      },
      {
        name: 'importLicense',
      },
      {
        name: 'healthCertificate',
      },
      {
        name: 'senasaDocuments',
      },
      {
        name: 'emotionalSupportCertificate',
      },
    ];
  }
}
