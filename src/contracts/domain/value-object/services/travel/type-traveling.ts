import { TypeTraveling as TypeTravelingType } from '../../../interfaces/travel';
import { ErrorInvalidadArgument } from '../../../../../common/domain/errors/error-invalid-argument';

export class TypeTraveling {
  static values: TypeTravelingType[] = ['accompanied', 'charge', 'none'];

  constructor(readonly value: TypeTravelingType) {
    this.validSecured(value);
  }

  private validSecured(value: TypeTravelingType) {
    if (!TypeTraveling.values.includes(value)) {
      throw new ErrorInvalidadArgument('No es un tipo de viaje válido');
    }
  }
}
