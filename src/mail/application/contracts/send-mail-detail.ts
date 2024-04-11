import { UserEmail } from '../../../users/domain/value-object/user-email';
import { UserRepository } from '../../../users/domain/user.repository';
import { Uuid } from '../../../common/domain/value-object';
import { UserResponse } from '../../../users/domain/interfaces/user.response';
import { ContractDetailUpdaterResponse } from '../../../contract-detail/application/response/contract-detail-update.response';
import { ContractDetailResponse } from '../../../contract-detail/application/response/contract-detail.response';
import { DateService } from '../../../common/application/services/date-service';
import updateTopicoTemplate from '../../domain/contracts/update-detail-template';
import { MeasurementsAndWeightInterface } from '../../../pets/domain/interfaces/pet-measurements-and-weight';
import { CageChosenInterface } from '../../../contract-detail/domain/interfaces/cage.interface';
import { ContractTopicoInterface } from '../../../contract-detail/domain/interfaces/topico.interface';
import { PetInterface } from '../../../pets/domain/interfaces/pet.interface';
import { DocumentationInterface } from '../../../contract-detail/domain/interfaces/documentation.interface';

export class SendMailUpdateDetail {
  constructor(
    private readonly transporter: any,
    private readonly userRepository: UserRepository,
    private readonly dateService: DateService,
  ) {}

  async execute(data: ContractDetailUpdaterResponse): Promise<void> {
    const { contract, contractDetail } = data;
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
        this.getHtml(contractDetail, adviser.profile.phone),
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
      subject: `Pet Travel proceso de  ${contractDetail.pet.name}`,
      html,
    };
  }

  getHtml(contractDetail: ContractDetailResponse, phone: string) {
    const { documentation, topico, pet } = contractDetail;
    const topicoKeys = this.getTopico(pet);
    const documentationKeys = this.getDocumentation();

    const measurementsAndWeight = this.measurementsAndWeight(
      pet?.measurementsAndWeight,
    );
    const chosenCage = this.chosenCage(pet?.cageRecommendation);

    let template = updateTopicoTemplate
      .replaceAll('{{pet.name}}', contractDetail.pet.name)
      .replaceAll('{{phone}}', phone)
      .replaceAll('{{measurementsAndWeight}}', measurementsAndWeight)
      .replaceAll('{{chosen}}', chosenCage);

    topicoKeys.forEach(({ name, label, service }) => {
      template = template.replaceAll(
        `{{${name}}}`,
        this.renderServiceTopico(name, label, service, documentation, topico),
      );
    });

    documentationKeys.forEach(({ name, label }) => {
      template = template.replaceAll(
        `{{${name}}}`,
        this.renderServiceDocumentation(name, label, documentation),
      );
    });
    return template;
  }

  private measurementsAndWeight(
    measurementsAndWeight?: MeasurementsAndWeightInterface,
  ): string {
    const isMeasurements =
      !!measurementsAndWeight?.height ||
      !!measurementsAndWeight?.width ||
      !!measurementsAndWeight?.length ||
      !!measurementsAndWeight?.weight;

    const measurements = isMeasurements
      ? `${measurementsAndWeight?.height ?? 0} cm  x ${
          measurementsAndWeight?.width ?? 0
        } x  ${measurementsAndWeight?.length ?? 0} / ${
          measurementsAndWeight?.weight ?? 0
        } kg`
      : 'Aún no se han tomado las medidas ni el peso de la mascota';

    return measurements;
  }

  private chosenCage(chosenCage?: CageChosenInterface): string {
    const isCage =
      !!chosenCage?.modelCage ||
      !!chosenCage?.dimensionsCage ||
      !!chosenCage?.typeCage;

    const cage = isCage
      ? `Tipo: ${chosenCage?.typeCage ?? '--'}   Modelo: ${
          chosenCage?.modelCage ?? 0
        }   Medidas: ${chosenCage?.dimensionsCage ?? 0} cm`
      : 'Aún no se ha recomendado jaula a la mascota';

    return cage;
  }

  private renderServiceTopico(
    name: string,
    label: string,
    service: string,
    documentation: DocumentationInterface,
    topico: ContractTopicoInterface,
  ): string {
    if (!documentation[service].hasServiceIncluded) return '';
    if (!topico[name].executed)
      return `<h4 style="background-color:green;padding:10px; color:#fff;border-radius:5px">${label}: Aún no realizado</h4>`;

    const value = `<h4 style="background-color:green;padding:10px; color:#fff;border-radius:5px">${label} realizada el ${this.dateService.formatDateTime(
      topico[name]?.date ?? '',
      'DD/MM/YYYY',
    )}</h4><span> ${topico[name]?.observation ?? ''}</span>`;
    return value;
  }

  private renderServiceDocumentation(
    name: string,
    label: string,
    documentation: DocumentationInterface,
  ): string {
    if (!documentation[name].hasServiceIncluded) return '';
    if (!documentation[name].isApplied)
      return `<h4 style="background-color:green;padding:10px; color:#fff;border-radius:5px">${label}: Aún no realizado</h4>`;

    const value = `<h4 style="background-color:green;padding:10px; color:#fff;border-radius:5px">${label} realizada el ${this.dateService.formatDateTime(
      documentation[name]?.resultDate ?? '',
      'DD/MM/YYYY',
    )}</h4><span> ${documentation[name]?.observation ?? ''}</span>`;
    return value;
  }

  private getTopico(pet?: PetInterface) {
    let vaccination = 'Vacunación';
    if (pet?.type?.toLowerCase() === 'perro') {
      vaccination = 'Vacuna Quintuple';
    }
    if (pet?.type?.toLowerCase() === 'gato') {
      vaccination = 'Vacuna triple felina';
    }

    return [
      {
        name: 'chip',
        label: 'Implantación de Chip',
        service: 'chipCertificate',
      },
      {
        name: 'vaccination',
        label: vaccination,
        service: 'vaccinationCertificate',
      },
      {
        name: 'rabiesVaccination',
        label: 'Vacuna de Rabia',
        service: 'rabiesSeroLogicalTest',
      },
      {
        name: 'rabiesReVaccination',
        label: 'Revacunación de Rabia',
        service: 'rabiesSeroLogicalTest',
      },
      {
        name: 'takingSampleSerologicalTest',
        label: 'Toma de muestra para el test serological de rabia',
        service: 'rabiesSeroLogicalTest',
      },
    ];
  }

  private getDocumentation() {
    return [
      {
        name: 'chipCertificate',
        label: 'Certificado de chip',
      },
      {
        name: 'vaccinationCertificate',
        label: 'Certificado de vacuna',
      },
      {
        name: 'rabiesSeroLogicalTest',
        label: 'Test serological de rabia',
      },
      {
        name: 'importLicense',
        label: 'Permiso de importación',
      },
      {
        name: 'healthCertificate',
        label: 'Certificado de salud',
      },
      {
        name: 'senasaDocuments',
        label: 'Documento SENASA',
      },
      {
        name: 'emotionalSupportCertificate',
        label: 'Certificado de soporte emocional',
      },
    ];
  }
}
