import { faker } from '@faker-js/faker';

export class FirstNameMother {
  static create(): string {
    return faker.person.firstName();
  }
}
