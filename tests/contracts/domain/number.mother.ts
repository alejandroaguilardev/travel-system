import { faker } from '@faker-js/faker';

export class NumberMother {
  static create(): string {
    return faker.number.bigInt({ min: 1, max: 1000000 }).toString();
  }
}
