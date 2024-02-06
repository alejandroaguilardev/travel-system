import { faker } from '@faker-js/faker';

export class PetChipMother {
  static create(chip?: string): string {
    return chip ?? faker.number.bigInt().toString();
  }
}
