import { faker } from '@faker-js/faker';

export class UuidMother {
  static create(): string {
    return faker.string.uuid();
  }
}
