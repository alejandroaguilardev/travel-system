import { faker } from '@faker-js/faker';

export class BooleanMother {
  static create(value?: boolean): boolean {
    return value ?? faker.datatype.boolean();
  }
}
