import { TravelDestinationInterface } from '../../../interfaces/travel.interface';
import { TravelCityDestination } from './travel-city-destination';
import { TravelCountryDestination } from './travel-country-destination';
import { TravelDirectionDestination } from './travel-direction-destination';

export class TravelDestination {
  constructor(
    readonly countryDestination: TravelCountryDestination,
    readonly cityDestination: TravelCityDestination,
    readonly directionDestination: TravelDirectionDestination,
  ) {}

  toJson(): TravelDestinationInterface {
    return {
      countryDestination: this.countryDestination.value,
      cityDestination: this.cityDestination.value,
      directionDestination: this.directionDestination.value,
    };
  }

  static hasRequiredDestinationFields(
    destination: TravelDestinationInterface,
  ): boolean {
    return (
      !!destination.cityDestination &&
      !!destination.countryDestination &&
      !!destination.directionDestination
    );
  }
}
