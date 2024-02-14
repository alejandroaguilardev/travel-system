import { faker } from '@faker-js/faker';
import { DocumentationInterface } from '../../../src/contract-detail/domain/interfaces/documentation.interface';
import { DateMother } from '../../common/domain/date.mother';
import { StatusMother } from '../../contracts/domain/status.mother';

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
