import { faker } from '@faker-js/faker';

export class DateMother {
  static recent(): Date {
    return faker.date.recent();
  }

  static future(): Date {
    return faker.date.future();
  }
}
