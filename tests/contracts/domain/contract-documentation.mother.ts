import { faker } from '@faker-js/faker';
import { DocumentationInterface } from '../../../src/contracts/domain/interfaces/documentation.interface';
import { StatusMother } from './status.mother';
import { DateMother } from './date.mother';

export class ContractDocumentationMother {
  static create(): DocumentationInterface {
    return {
      chipCertificate: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
      },
      emotionalSupportCertificate: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
      },
      healthCertificate: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
      },
      importLicense: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
      },
      rabiesSeroLogicalTest: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
      },
      senasaDocuments: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
      },
      vaccinationCertificate: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
      },
      status: StatusMother.create(),
    };
  }
}
