import { faker } from '@faker-js/faker';

export class ContractPriceMother {
  static create(): number {
    return faker.number.int();
  }
}
