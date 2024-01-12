import { faker } from '@faker-js/faker';

export class EmailMother {
  static create(): string {
    return faker.internet.email();
  }
}
