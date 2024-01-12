import { faker } from '@faker-js/faker';

export class PasswordMother {
  static create(): string {
    return faker.internet.password();
  }
}
