import { faker } from '@faker-js/faker';

export class PhoneMother {
  static create(phone?: string): string {
    return (
      phone ??
      faker.number.int({ min: 1000000000, max: 999999999999 }).toString()
    );
  }
}
