import { ContractTypeTraveling } from '../../../src/contracts/domain/value-object/services/travel/type-traveling';
import { TypeTravelingType } from '../../../src/contracts/domain/interfaces/travel.interface';

export class TypeTravelingMother {
  static create(): TypeTravelingType {
    const randomIndex = Math.floor(
      Math.random() * ContractTypeTraveling.values.length,
    );
    return ContractTypeTraveling.values[randomIndex];
  }
}
