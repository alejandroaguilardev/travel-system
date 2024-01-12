import { faker } from '@faker-js/faker';

type Options = {
  count?: {
    min: number;
    max: number;
  };
};

export class StringMother {
  static create(options?: Options): string {
    return faker.word.words(options);
  }
}
