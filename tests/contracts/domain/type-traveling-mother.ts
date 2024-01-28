import { TypeTraveling } from '../../../src/contracts/domain/value-object/services/travel/type-traveling';
import { TypeTraveling as TypeTravelingType } from '../../../src/contracts/domain/interfaces/travel';

export class TypeTravelingMother {
  static create(): TypeTravelingType {
    const randomIndex = Math.floor(Math.random() * TypeTraveling.values.length);
    return TypeTraveling.values[randomIndex];
  }
}
