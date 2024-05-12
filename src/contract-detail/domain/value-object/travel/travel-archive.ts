import { ValueObject } from '../../../../common/domain/value-object/value-object';
import { ErrorInvalidadArgument } from '../../../../common/domain/errors/error-invalid-argument';

export class TravelArchive extends ValueObject<string> {
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

    const urlPattern = /^.*\.(png|jpg|jpeg|gif|svg|pdf)$/i;
    if (!urlPattern.test(this.value)) {
      throw new ErrorInvalidadArgument(
        'El archivo no tiene una extensión valida "png|jpg|jpeg|gif|svg|pdf" ',
      );
    }
  }
}
