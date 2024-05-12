import { faker } from '@faker-js/faker';

export class ImageMother {
  static create() {
    const image = faker.image.urlPlaceholder({
      text: '',
    });

    return image.replace('?text=', '');
  }
}
