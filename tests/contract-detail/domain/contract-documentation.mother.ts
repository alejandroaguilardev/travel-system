import { faker } from '@faker-js/faker';
import {
  DocumentationCertificateInterface,
  DocumentationInterface,
} from '../../../src/contract-detail/domain/interfaces/documentation.interface';
import { DateMother } from '../../common/domain/date.mother';
import { StatusMother } from '../../contracts/domain/status.mother';
import { ContractDocumentation } from '../../../src/contract-detail/domain/value-object/service-documentation';
import { StringMother } from '../../common/domain/string.mother';
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
      clientStatus: StatusMother.create(),
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
      isPrint: faker.datatype.boolean(),
      observation: StringMother.create(),
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
      isPrint: faker.datatype.boolean(),
      observation: StringMother.create(),
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
      isPrint: faker.datatype.boolean(),
      observation: StringMother.create(),
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
      isPrint: faker.datatype.boolean(),
      observation: StringMother.create(),
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
      isPrint: faker.datatype.boolean(),
      observation: StringMother.create(),
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
      isPrint: faker.datatype.boolean(),
      observation: StringMother.create(),
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
      isPrint: faker.datatype.boolean(),
      observation: StringMother.create(),
    };
  }
}
