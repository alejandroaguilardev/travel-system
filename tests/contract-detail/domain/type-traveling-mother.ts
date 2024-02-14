import { ContractTypeTraveling } from '../../../src/contract-detail/domain/value-object/travel/type-traveling';
import { TypeTravelingType } from '../../../src/contract-detail/domain/interfaces/travel.interface';

export class TypeTravelingMother {
  static create(): TypeTravelingType {
    const randomIndex = Math.floor(
      Math.random() * ContractTypeTraveling.values.length,
    );
    return ContractTypeTraveling.values[randomIndex];
  }
}
