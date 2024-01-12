import { faker } from '@faker-js/faker';

export class LastNameMother {
  static create(): string {
    return faker.person.lastName();
  }
}
