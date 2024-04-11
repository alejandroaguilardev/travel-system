import { JWT } from '../../../auth/application/services/jwt';
import { UserEmail } from '../../../users/domain/value-object/user-email';
import { UserRepository } from '../../../users/domain/user.repository';
import { Uuid } from '../../../common/domain/value-object';
import { UserResponse } from '../../../users/domain/interfaces/user.response';
import { ContractDetailUpdaterResponse } from '../../../contract-detail/application/response/contract-detail-update.response';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from '../../../contract-detail/application/response/contract-detail.response';
import travelPersonContractTemplate from '../../domain/contracts/travel-person-contract-template';
import travelPersonVerifyTemplate from '../../domain/contracts/travel-person-verify-template';
import { ContractTravel } from '../../../contract-detail/domain/value-object/service-travel';
import {
  TypeTravelingType,
  TravelPetPerChargeInterface,
} from '../../../contract-detail/domain/interfaces/travel.interface';
import { UbigeoQueryInterface } from '../../../ubigeo/domain/interfaces/ubigeo-query.interface';

export class SendMailTravelPersonContract {
  constructor(
    private readonly transporter: any,
    private readonly userRepository: UserRepository,
    private readonly jwt: JWT,
    private readonly ubigeo: UbigeoQueryInterface,
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
      subject: `Pet Travel Contrato acompañante de ${contractDetail.pet.name}`,
      html,
    };
  }

  async getHtml(
    contract: ContractResponse,
    contractDetail: ContractDetailResponse,
    phone: string,
  ) {
    if (this.isConfirmedData(contractDetail)) {
      const { accompaniedPet, petPerCharge, typeTraveling, destination } =
        contractDetail.travel;

      const [department, province, district] = await Promise.all([
        this.ubigeo.findOneDepartment(accompaniedPet?.department ?? ''),
        this.ubigeo.findOneProvince(accompaniedPet?.province ?? ''),
        this.ubigeo.findOneDistrict(accompaniedPet?.district ?? ''),
      ]);

      return travelPersonVerifyTemplate
        .replaceAll(
          '{{client}}',
          `${contract.client?.profile?.name ?? 'Cliente'} ${
            contract.client?.profile?.lastName ?? ''
          }`,
        )
        .replaceAll('{{pet.name}}', contractDetail.pet.name)
        .replaceAll('{{phone}}', phone)
        .replaceAll(
          '{{destination.countryDestination}}',
          destination.countryDestination,
        )
        .replaceAll(
          '{{destination.cityDestination}}',
          destination.cityDestination,
        )
        .replaceAll(
          '{{destination.directionDestination}}',
          destination.directionDestination,
        )
        .replaceAll('{{accompaniedPet.document}}', accompaniedPet.document)
        .replaceAll(
          '{{accompaniedPet.documentNumber}}',
          accompaniedPet.documentNumber,
        )
        .replaceAll('{{accompaniedPet.name}}', accompaniedPet.name)
        .replaceAll('{{accompaniedPet.phone}}', accompaniedPet.phone)
        .replaceAll('{{accompaniedPet.email}}', accompaniedPet.email)
        .replaceAll('{{accompaniedPet.department}}', department?.name ?? '--')
        .replaceAll('{{accompaniedPet.province}}', province?.name ?? '--')
        .replaceAll('{{accompaniedPet.district}}', district?.name ?? '--')
        .replaceAll('{{accompaniedPet.direction}}', accompaniedPet.direction)
        .replaceAll(
          '{{charge}}',
          this.renderCharge(typeTraveling, petPerCharge),
        );
    }

    const token = this.jwt.generateToken({ id: contract.client.id });

    return travelPersonContractTemplate
      .replaceAll(
        '{{client}}',
        `${contract.client?.profile?.name ?? 'Cliente'} ${
          contract.client?.profile?.lastName ?? ''
        }`,
      )
      .replaceAll('{{pet.name}}', contractDetail.pet.name)
      .replaceAll('{{phone}}', phone)
      .replaceAll('{{contractId}}', contract.id)
      .replaceAll('{{contractDetailId}}', contractDetail.id)
      .replaceAll('{{token}}', token);
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
      <td align="center">
          <p style="text-align: center;font-weight: bold;">Datos de destinatario por cargo</p>
          <table border="0" cellpadding="0" cellspacing="0" width="100%"   style="max-width: 600px;padding: 0 50px 0;">
              <tr>
                  <td style="width: 50%;">Documento:</td>
                  <td style="width: 50%;">${petPerCharge.document} N° ${petPerCharge.documentNumber}</td>
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
