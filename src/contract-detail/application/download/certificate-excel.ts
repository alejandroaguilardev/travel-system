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
  ContractDetailInterface,
  TravelAccompaniedPetInterface,
  TravelPetPerChargeInterface,
  TypeTravelingType,
} from '../../../contract-detail/domain/interfaces';
import { UbigeoQueryInterface } from '../../../ubigeo/domain/interfaces/ubigeo-query.interface';
import { ErrorInvalidadArgument } from '../../../common/domain/errors/error-invalid-argument';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { CommandContractDetailsUpdater } from '../update';

export class CertificateExcelDownload {
  private certificates = [
    'chipCertificate',
    'healthCertificate',
    'vaccinationCertificate',
  ];

  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly http: HttpInterface,
    private readonly dateService: DateService,
    private readonly ubigeo: UbigeoQueryInterface,
  ) { }

  async execute(
    contractId: Uuid,
    contractDetailId: Uuid,
    certificate: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<{ response: any; name: string }> {
    this.enSecureParam(certificate);
    const { contract, contractDetail } = await this.getDetailContract(
      contractId,
      contractDetailId,
    );

    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACT_DOCUMENTATION,
      AuthPermission.EXECUTE,
    );

    const data = await this.formatData(contractDetail);
    const response = await this.http.post(
      `/excel/certificate/${certificate}`,
      data,
      {
        headers: {
          Authorization: process.env.API_LARAVEL_KEY,
        },
        responseType: 'stream',
      },
    ).catch(e => console.log(e));

    if (contractDetail.documentation[certificate]?.isPrint) {
      this.updateIsPrint(contractId, contract, contractDetail, certificate);
    }

    const name: string =
      response?.headers['content-disposition']?.split('filename=')?.[1] ??
      `certificado-${data.client?.toLowerCase()}.xlsx`;
    return {
      response: response.data,
      name: name.replaceAll('"', ''),
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
          'dd/MM/yyyy',
        )
        : '',
      countryDestiny: destination.countryDestination,
      cityDestiny: destination.cityDestination,
      directionDestiny: destination.directionDestination,

      petName: pet.name,
      petAge: this.petAge(pet.birthDate),
      petDate: this.dateService.formatDateTime(pet.birthDate, 'dd/MM/yyyy'),
      petRace: pet.race,
      petGender: this.petGender(pet.gender),
      petColor: pet.color,
      petChip: pet.chip,
      petChipDate: pet.chipDate
        ? this.dateService.formatDateTime(pet.chipDate, 'dd/MM/yyyy')
        : '',
      petAgeVaccination: this.petAgeVaccination(
        pet.birthDate,
        documentation.vaccinationCertificate.resultDate,
      ),
      vaccinationDate: documentation.vaccinationCertificate.resultDate
        ? this.dateService.formatDateTime(
          documentation.vaccinationCertificate.resultDate,
          'dd/MM/yyyy',
        )
        : '',
      healthDayAndMonth: documentation.healthCertificate.resultDate
        ? this.dateService.formatDateTime(
          documentation.healthCertificate.resultDate,
          "dd 'de' MMMM",
        )
        : '',
      healthYear: this.dateService.formatDateTime(
        documentation.healthCertificate.resultDate,
        'yyyy',
      ),

      petAgeEnglish: this.petAgeEnglish(pet.birthDate),
      petDateEnglish: this.dateService.formatDateTime(
        pet.birthDate,
        'MM/dd/yyyy',
      ),
      PetRaceEnglish: pet.race,
      PetGenderEnglish: pet.gender,
      petColorEnglish: pet.color,
      petChipDateEnglish: this.dateService.formatDateTime(
        pet.chipDate,
        'MM/dd/yyyy',
      ),

      healthEnglish: this.dateService.formatDateTime(
        documentation.vaccinationCertificate.resultDate,
        'MM/dd/yyyy',
      ),
      vaccinationDateEnglish: this.dateService.formatDateTime(
        documentation.vaccinationCertificate.resultDate,
        'MM/dd/yyyy',
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
    return this.dateService.addDays(value, 365, 'MM/dd/yyyy');
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
    const value = this.dateService.formatDifferenceInYearsAndMonths(birthDate);
    return value;
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

  private enSecureParam(certificate: string) {
    if (!this.certificates.includes(certificate)) {
      throw new ErrorInvalidadArgument(
        'No es un certificado disponible para descargar',
      );
    }
  }

  private async getDetailContract(contractId: Uuid, contractDetailId: Uuid) {
    const contract =
      await this.contractRepository.searchByIdWithPet(contractId);

    const contractDetail = contract.details.find(
      (_) => _.id === contractDetailId.value,
    );
    return { contract, contractDetail };
  }

  private async updateIsPrint(
    contractId: Uuid,
    contract: ContractResponse,
    contractDetail: ContractDetailResponse,
    certificate: string,
  ) {
    const details: ContractDetailInterface[] = contract.details.map(
      (detail) => {
        const pet =
          typeof detail.pet === 'string' ? detail.pet : detail?.pet?.id ?? '';
        if (detail.id === contractDetail.id) {
          return {
            ...detail,
            pet,
            documentation: {
              ...detail.documentation,
              [certificate]: {
                ...detail.documentation[certificate],
                isPrint: true,
              },
            },
          };
        }
        return { ...detail, pet };
      },
    );

    const updatedDetails = CommandContractDetailsUpdater.execute(details);
    this.contractRepository.updateDetail(contractId, updatedDetails);
  }
}
