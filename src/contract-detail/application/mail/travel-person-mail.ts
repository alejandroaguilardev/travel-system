import { HttpInterface } from '../../../common/application/services/http-service';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from '../response/contract-detail.response';
import { ContractTravel } from '../../domain/value-object/service-travel';
import { JWT } from '../../../auth/application/services/jwt';
import { UbigeoQueryInterface } from '../../../ubigeo/domain/interfaces/ubigeo-query.interface';
import {
  TravelPetPerChargeInterface,
  TypeTravelingType,
} from '../../../contract-detail/domain/interfaces/travel.interface';

export class TravelPersonMail {
  constructor(
    private readonly http: HttpInterface,
    private readonly ubigeo: UbigeoQueryInterface,
    private readonly jwt: JWT,
  ) {}

  async execute(
    contract: ContractResponse,
    contractDetail: ContractDetailResponse,
  ): Promise<void> {
    const { pet } = contractDetail;
    const { accompaniedPet, petPerCharge, typeTraveling, destination } =
      contractDetail.travel;
    const isConfirmedData = this.isConfirmedData(contractDetail);

    let token = '';
    let [accompaniedDepartment, accompaniedProvince, accompaniedDistrict] =
      '--';
    if (isConfirmedData) {
      token = this.jwt.generateToken({ id: contract.client.id });
      const [department, province, district] = await Promise.all([
        this.ubigeo.findOneDepartment(accompaniedPet?.department ?? ''),
        this.ubigeo.findOneProvince(accompaniedPet?.province ?? ''),
        this.ubigeo.findOneDistrict(accompaniedPet?.district ?? ''),
      ]);
      accompaniedDepartment = department?.name ?? '--';
      accompaniedProvince = province?.name ?? '--';
      accompaniedDistrict = district?.name ?? '--';
    }

    const data = {
      contractId: contract.id,
      contractDetail: contractDetail.id,
      client:
        contract?.client?.profile?.name + ' ' + contract?.client?.profile?.name,
      email: contract.client.email,
      petName: pet?.name ?? '',
      phone: contract.adviser.profile.phone,

      country: destination.countryDestination,
      city: destination.cityDestination,
      direction: destination.directionDestination,

      accompaniedDocument: accompaniedPet.document,
      accompaniedDocumentNumber: accompaniedPet.documentNumber,
      accompaniedName: accompaniedPet.name,
      accompaniedPhone: accompaniedPet.phone,
      accompaniedEmail: accompaniedPet.email,
      accompaniedDepartment,
      accompaniedProvince,
      accompaniedDistrict,
      accompaniedDirection: accompaniedPet.direction,
      accompaniedCharge: this.renderCharge(typeTraveling, petPerCharge),

      token,
      isConfirmedData,
    };

    this.http
      .post(`/mail/detail/travel-person`, { data })
      .catch((e) => console.log(e));
  }

  private isConfirmedData(contractDetail: ContractDetailResponse): boolean {
    let hasRequiredPetChargeFields = true;
    const hasRequiredAccompaniedPetFields: boolean =
      ContractTravel.hasRequiredAccompaniedPetFields(
        contractDetail.travel.accompaniedPet,
      );

    const hasRequiredDestinationFields: boolean =
      ContractTravel.hasRequiredDestinationFields(
        contractDetail.travel.destination,
      );

    if (contractDetail.travel.typeTraveling === 'charge') {
      hasRequiredPetChargeFields = ContractTravel.hasRequiredPetChargeFields(
        contractDetail.travel.petPerCharge,
      );
    }
    return (
      hasRequiredPetChargeFields &&
      hasRequiredAccompaniedPetFields &&
      hasRequiredDestinationFields
    );
  }

  private renderCharge(
    typeTraveling: TypeTravelingType,
    petPerCharge: TravelPetPerChargeInterface,
  ): string {
    if (typeTraveling === 'charge') {
      return `<tr>
          <td align='center'>
              <p style='text-align: center;font-weight: bold;'>Datos de destinatario por cargo</p>
              <table border='0' cellpadding='0' cellspacing='0' width='100%'   style='max-width: 600px;padding: 0 50px 0;'>
                  <tr>
                      <td style='width: 50%;'>Documento:</td>
                      <td style='width: 50%;'>${petPerCharge.document} N° ${petPerCharge.documentNumber}</td>
                  </tr>
                  <tr>
                      <td>Nombre:</td>
                      <td>${petPerCharge.name}</td>
                  </tr>
                  <tr>
                      <td>Teléfono:</td>
                      <td>${petPerCharge.phone}</td>
                  </tr>
                  <tr>
                      <td>Correo:</td>
                      <td>${petPerCharge.email}</td>
                  </tr>
              </table>
          </td>
          </tr>`;
    }
    return '';
  }
}
