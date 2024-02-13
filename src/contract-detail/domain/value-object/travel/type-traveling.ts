import { TypeTravelingType } from '../../interfaces/travel.interface';
import { ErrorInvalidadArgument } from '../../../../common/domain/errors/error-invalid-argument';

export class ContractTypeTraveling {
  static values: TypeTravelingType[] = ['accompanied', 'charge', 'none'];

  constructor(readonly value: TypeTravelingType) {
    this.validSecured(value);
  }

  private validSecured(value: TypeTravelingType) {
    if (!ContractTypeTraveling.values.includes(value)) {
      throw new ErrorInvalidadArgument('No es un tipo de viaje válido');
    }
  }
}
