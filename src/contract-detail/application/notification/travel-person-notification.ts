import { HttpInterface } from '../../../common/application/services/http-service';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from '../response/contract-detail.response';
import { JWT } from '../../../auth/application/services/jwt';
import { UbigeoQueryInterface } from '../../../ubigeo/domain/interfaces/ubigeo-query.interface';
import { TravelDestination } from '../../domain/value-object/travel/destination/travel-destination';
import { TravelAccompaniedPet } from '../../domain/value-object/travel/accompanied-pet/travel-accompanied-pet';
import { TravelPetPerCharge } from '../../domain/value-object/travel/travel-pet-per-charge';
import {
  TravelPetPerChargeInterface,
  TypeTravelingType,
} from '../../domain/interfaces/travel.interface';

export class TravelPersonNotification {
  constructor(
    private readonly http: HttpInterface,
    private readonly ubigeo: UbigeoQueryInterface,
    private readonly jwt: JWT,
  ) { }

  async execute(
    contract: ContractResponse,
    contractDetail: ContractDetailResponse,
  ): Promise<void> {
    const data = await this.formatData(contract, contractDetail);

    await this.http
      .post(`/notification/detail/travel-person`, { ...data })
      .catch(e => console.log(e));
  }

  private async formatData(
    contract: ContractResponse,
    contractDetail: ContractDetailResponse,
  ) {
    const { pet } = contractDetail;
    const { accompaniedPet, petPerCharge, typeTraveling, destination } =
      contractDetail.travel;
    let token = '';
    let accompaniedDepartment = '--';
    let accompaniedProvince = '--';
    let accompaniedDistrict = '--';

    const isConfirmedData = this.isConfirmedData(contractDetail);

    if (isConfirmedData) {
      const [department, province, district] = await Promise.all([
        this.ubigeo.findOneDepartment(accompaniedPet?.department ?? ''),
        this.ubigeo.findOneProvince(accompaniedPet?.province ?? ''),
        this.ubigeo.findOneDistrict(accompaniedPet?.district ?? ''),
      ]);
      accompaniedDepartment = department?.name ?? '--';
      accompaniedProvince = province?.name ?? '--';
      accompaniedDistrict = district?.name ?? '--';
    } else {
      token = this.jwt.generateToken({ id: contract.client.id });
    }

    return {
      contractId: contract.id,
      contractDetailId: contractDetail.id,
      client:
        contract?.client?.profile?.name + ' ' + contract?.client?.profile?.name,
      email: contract.client.email,
      petName: pet?.name ?? '',
      phone: contract?.client?.profile?.phone,
      phoneAdviser: contract.adviser.profile.phone,
      linkWhatsApp: contract.adviser?.linkWhatsApp ?? '',
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
  }

  private isConfirmedData(contractDetail: ContractDetailResponse): boolean {
    let hasRequiredPetChargeFields = true;
    const hasRequiredAccompaniedPetFields: boolean =
      TravelAccompaniedPet.hasRequiredAccompaniedPetFields(
        contractDetail.travel.accompaniedPet,
      );

    const hasRequiredDestinationFields: boolean =
      TravelDestination.hasRequiredDestinationFields(
        contractDetail.travel.destination,
      );

    if (contractDetail.travel.typeTraveling === 'charge') {
      hasRequiredPetChargeFields =
        TravelPetPerCharge.hasRequiredPetChargeFields(
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
