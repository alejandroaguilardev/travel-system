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
import {
  TravelAccompaniedPetInterface,
  TravelPetPerChargeInterface,
  TypeTravelingType,
} from '../../../contract-detail/domain/interfaces';
import { UbigeoQueryInterface } from '../../../ubigeo/domain/interfaces/ubigeo-query.interface';

export class CertificateExcelDownload {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly http: HttpInterface,
    private readonly dateService: DateService,
    private readonly ubigeo: UbigeoQueryInterface,
  ) {}

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
    const response = await this.http.post(`/excel/certificate`, data, {
      headers: {
        Authorization: process.env.API_MAIL_KEY,
      },
      responseType: 'stream',
    });
    return {
      response: response.data,
      name: `certificado-${data.client?.toLowerCase()}.xlsx`,
    };
  }

  private async formatData(contractDetail: ContractDetailResponse) {
    const { pet, travel, documentation } = contractDetail;
    const { accompaniedPet, destination, petPerCharge, typeTraveling } = travel;

    const [department, province, district] = await Promise.all([
      this.ubigeo.findOneDepartment(accompaniedPet?.department ?? ''),
      this.ubigeo.findOneProvince(accompaniedPet?.province ?? ''),
      this.ubigeo.findOneDistrict(accompaniedPet?.district ?? ''),
    ]);

    const exportData = this.exportData(
      typeTraveling,
      accompaniedPet,
      petPerCharge,
    );

    return {
      client: accompaniedPet.name,
      documentNumber: accompaniedPet.documentNumber,
      direction: accompaniedPet.direction,
      district: district?.name ?? ' ',
      province: province?.name ?? ' ',
      department: department?.name ?? ' ',
      phone: accompaniedPet.phone,

      exportName: exportData.name,
      exportEmail: exportData.email,

      inspectionDate: documentation.senasaDocuments.executionDate
        ? this.dateService.formatDateTime(
            documentation.senasaDocuments.executionDate,
            'DD/MM/YYYY',
          )
        : '',
      countryDestiny: destination.countryDestination,
      cityDestiny: destination.cityDestination,
      directionDestiny: destination.directionDestination,

      petName: pet.name,
      petAge: this.petAge(pet.birthDate),
      petDate: this.dateService.formatDateTime(pet.birthDate, 'DD/MM/YYYY'),
      petRace: pet.race,
      petGender: this.petGender(pet.gender),
      petColor: pet.color,
      petChip: pet.chip,
      petChipDate: this.dateService.formatDateTime(pet.chipDate, 'DD/MM/YYYY'),
      petAgeVaccination: this.petAgeVaccination(
        pet.birthDate,
        documentation.vaccinationCertificate.resultDate,
      ),
      vaccinationDate: documentation.vaccinationCertificate.resultDate
        ? this.dateService.formatDateTime(
            documentation.vaccinationCertificate.resultDate,
            'DD/MM/YYYY',
          )
        : '',
      healthDayAndMonth: documentation.healthCertificate.resultDate
        ? this.dateService.formatDateTime(
            documentation.healthCertificate.resultDate,
            'DD [de] MMMM',
          )
        : '',
      healthYear: this.dateService.formatDateTime(
        documentation.healthCertificate.resultDate,
        'YYYY',
      ),

      petAgeEnglish: this.petAgeEnglish(pet.birthDate),
      petDateEnglish: this.dateService.formatDateTime(
        pet.birthDate,
        'MM/DD/YYYY',
      ),
      PetRaceEnglish: pet.race,
      PetGenderEnglish: pet.gender,
      petColorEnglish: pet.color,
      petChipDateEnglish: this.dateService.formatDateTime(
        pet.chipDate,
        'MM/DD/YYYY',
      ),

      healthEnglish: this.dateService.formatDateTime(
        documentation.vaccinationCertificate.resultDate,
        'MM/DD/YYYY',
      ),
      vaccinationDateEnglish: this.dateService.formatDateTime(
        documentation.vaccinationCertificate.resultDate,
        'MM/DD/YYYY',
      ),
      vaccinationNextDateEnglish: this.vaccinationNextDateEnglish(
        documentation.vaccinationCertificate.resultDate,
      ),
      petAgeVaccinationEnglish: this.petAgeVaccinationEnglish(
        pet.birthDate,
        documentation.vaccinationCertificate.resultDate,
      ),
    };
  }

  private vaccinationNextDateEnglish(value: Date): string {
    return this.dateService.addDays(value, 365, 'MM/DD/YYYY');
  }

  private petAgeVaccination(birthDate: Date, dateVaccination: Date) {
    return this.dateService.formatDifferenceInYearsAndMonths(
      birthDate,
      dateVaccination,
    );
  }

  private petAgeVaccinationEnglish(birthDate: Date, dateVaccination: Date) {
    const value = this.dateService.formatDifferenceInYearsAndMonths(
      birthDate,
      dateVaccination,
    );
    return this.dateStringToEnglish(value);
  }

  private exportData(
    typeTraveling: TypeTravelingType,
    accompaniedPet: TravelAccompaniedPetInterface,
    petPerCharge: TravelPetPerChargeInterface,
  ): { name: string; email: string } {
    if (typeTraveling === 'charge') {
      return {
        name: petPerCharge.name,
        email: petPerCharge.email,
      };
    }
    return {
      name: accompaniedPet.name,
      email: accompaniedPet.email,
    };
  }

  private petAge(birthDate: Date) {
    return this.dateService.formatDifferenceInYearsAndMonths(birthDate);
  }

  private petAgeEnglish(birthDate: Date) {
    const value = this.dateService.formatDifferenceInYearsAndMonths(birthDate);
    return this.dateStringToEnglish(value);
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

  private dateStringToEnglish(value: string): string {
    return value
      .replace('años', 'years')
      .replace('año', 'year')
      .replace('meses', 'months')
      .replace('mes', 'month');
  }
}
