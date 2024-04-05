import { faker } from '@faker-js/faker';
import {
  DocumentationCertificateInterface,
  DocumentationInterface,
} from '../../../src/contract-detail/domain/interfaces/documentation.interface';
import { DateMother } from '../../common/domain/date.mother';
import { StatusMother } from '../../contracts/domain/status.mother';
import { ContractDocumentation } from '../../../src/contract-detail/domain/value-object/service-documentation';
export class ContractDocumentationMother {
  static value(): keyof typeof ContractDocumentation.keysObject {
    return ContractDocumentation.keys[
      faker.number.int({ min: 0, max: ContractDocumentation.keys.length - 1 })
    ] as keyof typeof ContractDocumentation.keysObject;
  }

  static create(): DocumentationInterface {
    return {
      chipCertificate: this.chipCertificate(),
      emotionalSupportCertificate: this.emotionalSupportCertificate(),
      healthCertificate: this.healthCertificate(),
      importLicense: this.importLicense(),
      rabiesSeroLogicalTest: this.rabiesSeroLogicalTest(),
      senasaDocuments: this.senasaDocuments(),
      vaccinationCertificate: this.vaccinationCertificate(),
      status: StatusMother.create(),
    };
  }

  private static chipCertificate(): DocumentationCertificateInterface {
    return {
      hasServiceIncluded: faker.datatype.boolean(),
      isApplied: faker.datatype.boolean(),
      isRequired: faker.datatype.boolean(),
      expectedDate: DateMother.recent(),
      executionDate: null,
      resultDate: null,
    };
  }

  private static emotionalSupportCertificate(): DocumentationCertificateInterface {
    return {
      hasServiceIncluded: faker.datatype.boolean(),
      isApplied: faker.datatype.boolean(),
      isRequired: faker.datatype.boolean(),
      expectedDate: DateMother.recent(),
      executionDate: null,
      resultDate: null,
    };
  }

  private static healthCertificate(): DocumentationCertificateInterface {
    return {
      hasServiceIncluded: faker.datatype.boolean(),
      isApplied: faker.datatype.boolean(),
      isRequired: faker.datatype.boolean(),
      expectedDate: DateMother.recent(),
      executionDate: null,
      resultDate: null,
    };
  }

  private static importLicense(): DocumentationCertificateInterface {
    return {
      hasServiceIncluded: faker.datatype.boolean(),
      isApplied: faker.datatype.boolean(),
      isRequired: faker.datatype.boolean(),
      expectedDate: DateMother.recent(),
      executionDate: null,
      resultDate: null,
    };
  }

  private static rabiesSeroLogicalTest(): DocumentationCertificateInterface {
    return {
      hasServiceIncluded: faker.datatype.boolean(),
      isApplied: faker.datatype.boolean(),
      isRequired: faker.datatype.boolean(),
      expectedDate: DateMother.recent(),
      executionDate: null,
      resultDate: null,
    };
  }

  private static senasaDocuments(): DocumentationCertificateInterface {
    return {
      hasServiceIncluded: faker.datatype.boolean(),
      isApplied: faker.datatype.boolean(),
      isRequired: faker.datatype.boolean(),
      expectedDate: DateMother.recent(),
      executionDate: null,
      resultDate: null,
    };
  }

  private static vaccinationCertificate(): DocumentationCertificateInterface {
    return {
      hasServiceIncluded: faker.datatype.boolean(),
      isApplied: faker.datatype.boolean(),
      isRequired: faker.datatype.boolean(),
      expectedDate: DateMother.recent(),
      executionDate: null,
      resultDate: null,
    };
  }
}
