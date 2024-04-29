import { HttpInterface } from '../../../common/application/services/http-service';
import { DateService } from '../../../common/application/services/date-service';
import { ContractDetailResponse } from '../response/contract-detail.response';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { UbigeoQueryInterface } from '../../../ubigeo/domain/interfaces/ubigeo-query.interface';

export class SenasaExcelDownload {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly http: HttpInterface,
    private readonly dateService: DateService,
    private readonly ubigeo: UbigeoQueryInterface,
  ) { }

  async execute(
    contractId: Uuid,
    contractDetailId: Uuid,
    user: UserWithoutWithRoleResponse,
  ): Promise<{ response: any; name: string }> {
    const contract =
      await this.contractRepository.searchByIdWithPet(contractId);
    const contractDetail = contract.details.find(
      (_) => _.id === contractDetailId.value,
    );

    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACTS,
      AuthPermission.DOCUMENTATION,
    );

    const data = await this.formatData(contractDetail);

    const response = await this.http.post(`/excel/senasa`, data, {
      headers: {
        Authorization: process.env.API_MAIL_KEY,
      },
      responseType: 'stream',
    });
    return {
      response: response.data,
      name: `senasa-${data.client?.toLowerCase()}.xlsx`,
    };
  }

  private async formatData(contractDetail: ContractDetailResponse) {
    const { pet, travel, documentation } = contractDetail;
    const { accompaniedPet, destination, airlineReservation } = travel;

    const [department, province, district] = await Promise.all([
      this.ubigeo.findOneDepartment(
        contractDetail?.travel?.accompaniedPet?.department ?? '',
      ),
      this.ubigeo.findOneProvince(
        contractDetail?.travel?.accompaniedPet?.province ?? '',
      ),
      this.ubigeo.findOneDistrict(
        contractDetail?.travel?.accompaniedPet?.district ?? '',
      ),
    ]);

    return {
      client: accompaniedPet.name,
      documentNumber: accompaniedPet.documentNumber,
      direction: accompaniedPet.direction,
      district: district?.name ?? ' ',
      province: province?.name ?? ' ',
      department: department?.name ?? ' ',
      phone: accompaniedPet.phone,
      email: accompaniedPet.email,

      inspectionDate: this.dateService.formatDateTime(
        documentation.senasaDocuments.executionDate,
        'dd/MM/yyyy',
      ),
      shippingDate: this.dateService.formatDateTime(
        airlineReservation.departureDate,
        'dd/MM/yyyy',
      ),
      disembarkationDate: this.dateService.formatDateTime(
        airlineReservation.arrivalDate,
        'dd/MM/yyyy',
      ),
      countryDestiny: destination.countryDestination,
      aeroportDestiny: airlineReservation.destinationAirport,
      petSpecie: pet.type.toLowerCase() === 'perro' ? 'Canino' : pet.type,
      petGender: this.petGender(pet.gender),
      petAge: this.petAge(pet.birthDate),
      petType: pet.type,
      petIdentification: pet.chip,
      petsQuantity: this.petsQuantity(),
    };
  }

  private petAge(birthDate: Date) {
    return this.dateService.formatDifferenceInYearsAndMonths(birthDate);
  }

  private petsQuantity() {
    return '1';
  }

  private petGender(gender: string): string {
    if (gender === 'female') {
      return 'Hembra';
    }
    if (gender === 'male') {
      return 'Macho';
    }
    return '';
  }
}
