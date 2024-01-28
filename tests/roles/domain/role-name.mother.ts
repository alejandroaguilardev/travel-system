import { faker } from '@faker-js/faker';

export class RoleNameMother {
  static create(): string {
    return faker.person.firstName();
  }
}
