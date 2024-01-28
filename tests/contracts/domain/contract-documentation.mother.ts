import { faker } from '@faker-js/faker';
import { DocumentationDefinition } from '../../../src/contracts/domain/interfaces/documentation';
import { StatusMother } from './status.mother';

export class ContractDocumentationMother {
  static create(): DocumentationDefinition {
    return {
      chipCertificate: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
      },
      emotionalSupportCertificate: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
      },
      healthCertificate: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
      },
      importLicense: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
      },
      rabiesSeroLogicalTest: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
      },
      senasaDocuments: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
      },
      vaccinationCertificate: {
        hasServiceIncluded: faker.datatype.boolean(),
        isApplied: faker.datatype.boolean(),
      },
      status: StatusMother.create(),
    };
  }
}
