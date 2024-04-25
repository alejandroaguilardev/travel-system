import { HttpInterface } from '../../../common/application/services/http-service';
import { DateService } from '../../../common/application/services/date-service';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from '../response/contract-detail.response';
import { CageChosenInterface } from '../../../contract-detail/domain/interfaces/cage.interface';
import { MeasurementsAndWeightInterface } from '../../../pets/domain/interfaces/pet-measurements-and-weight';
import { DocumentationInterface } from '../../../contract-detail/domain/interfaces/documentation.interface';

export class InfoDetailMail {
  constructor(
    private readonly http: HttpInterface,
    private readonly dateService: DateService,
  ) {}

  async execute(
    contract: ContractResponse,
    contractDetail: ContractDetailResponse,
  ): Promise<void> {
    const { documentation, pet } = contractDetail;
    const chosenCage = this.chosenCage(pet?.cageRecommendation);
    const measurementsAndWeight = this.measurementsAndWeight(
      pet?.measurementsAndWeight,
    );
    const documentationData = this.getDocumentationRender(documentation);

    const data = {
      client:
        contract?.client?.profile?.name + ' ' + contract?.client?.profile?.name,
      email: contract.client.email,
      petName: pet?.name ?? '',
      phone: contract.adviser.profile.phone,
      chosenCage,
      measurementsAndWeight,
      documentation: documentationData.join(' '),
    };

    this.http.post(`/mail/detail/info`, { data }).catch((e) => console.log(e));
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
        } x  ${measurementsAndWeight?.length ?? 0} cm / ${
          measurementsAndWeight?.weight ?? 0
        } kg`
      : 'Aún no se han tomado las medidas ni el peso de la mascota';

    return measurements;
  }

  private getDocumentationRender(documentation: DocumentationInterface) {
    const documentationKeys = this.getDocumentationKeys();

    return documentationKeys.map((_) =>
      this.renderServiceDocumentation(_.name, _.label, documentation),
    );
  }

  private renderServiceDocumentation(
    name: string,
    label: string,
    documentation: DocumentationInterface,
  ): string {
    const isRequired: boolean = documentation[name]?.isRequired ?? false;
    const required: string = isRequired ? '(requerido)' : '(opcional)';

    if (!documentation[name].hasServiceIncluded) return '';
    if (!documentation[name].isApplied && isRequired)
      return `<h4 style='background-color:red;padding:10px; color:#fff;border-radius:5px'>${label} ${required}: Aún no realizado</h4>`;

    if (!documentation[name].isApplied && !isRequired)
      return `<h4 style='background-color:##5DADE2;padding:10px; color:#fff;border-radius:5px'>${label}  ${required}: Aún no realizado</h4>`;

    const value = `<h4 style='background-color:green;padding:10px; color:#fff;border-radius:5px'>${label}  ${required}: realizada el ${this.dateService.formatDateTime(
      documentation[name]?.resultDate ?? '',
      'DD/MM/YYYY',
    )}</h4><span> ${documentation[name]?.observation ?? ''}</span>`;
    return value;
  }

  private getDocumentationKeys() {
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
