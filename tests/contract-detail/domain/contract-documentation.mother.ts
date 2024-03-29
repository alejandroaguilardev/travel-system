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
        resultDate: null,
      },
      emotionalSupportCertificate: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
        resultDate: null,
      },
      healthCertificate: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
        resultDate: null,
      },
      importLicense: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
        resultDate: null,
      },
      rabiesSeroLogicalTest: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
        resultDate: null,
      },
      senasaDocuments: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
        resultDate: null,
      },
      vaccinationCertificate: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
        expectedDate: DateMother.recent(),
        executionDate: null,
        resultDate: null,
      },
      status: StatusMother.create(),
    };
  }
}
