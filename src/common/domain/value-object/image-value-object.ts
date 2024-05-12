import { ErrorInvalidadArgument } from '../errors';
import { ValueObject } from './value-object';

export class ImageValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value.trim());
    if (value.trim()) {
      this.isValid();
    }
  }

  private isValid() {
    if (this.value.length > 255) {
      throw new ErrorInvalidadArgument(
        'La recomendación debe ser menor a 255 caracteres',
      );
    }

    const urlPattern = /^.*\.(png|jpg|jpeg|gif|webp|svg)$/i;
    if (!urlPattern.test(this.value)) {
      throw new ErrorInvalidadArgument(
        'El URL de la imagen debe ser un URL válido y terminar con una extensión de archivo de imagen apropiada.',
      );
    }
  }
}
