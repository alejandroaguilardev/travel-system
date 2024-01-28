import { faker } from '@faker-js/faker';

export class PermissionNameMother {
  static create(): string {
    return faker.person.firstName();
  }
}
