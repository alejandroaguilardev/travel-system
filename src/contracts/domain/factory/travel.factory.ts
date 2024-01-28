import { ContractStatus } from '../value-object/contract-status';
import { ContractHasServiceIncluded } from '../value-object/contract-has-service.included';
import { ContractTravel } from '../value-object/services/service-travel';
import { TravelAirlineReservation } from '../value-object/services/travel/travel-airline-reservation';
import { TravelPetPerCharge } from '../value-object/services/travel/travel-pet-per-charge';
import { TravelCode } from '../value-object/services/travel/travel-code';
import { TravelFlightNumber } from '../value-object/services/travel/travel-flight-number';
import { TravelDepartureAirport } from '../value-object/services/travel/travel-departure-airport';
import { TravelDestinationAirport } from '../value-object/services/travel/travel-destination-airport';
import { TravelDepartureDate } from '../value-object/services/travel/travel-departure-date';
import { TravelEmail } from '../value-object/services/travel/travel-email';
import { TravelPhone } from '../value-object/services/travel/travel-phone';
import { TravelPickupDataTime } from '../value-object/services/travel/travel-pickup-date-time';
import { TravelPickupLocation } from '../value-object/services/travel/travel-pickup-location';
import { TravelSpecialRequests } from '../value-object/services/travel/travel-special-requests';
import { TravelReceptor } from '../value-object/services/travel/travel-receptor';
import { TravelDefinition } from '../interfaces/travel';
import { TypeTraveling } from '../value-object/services/travel/type-traveling';
import { TypeTraveling as TypeTravelingType } from '../interfaces/travel';

export class ContractTravelFactory {
  static create(
    hasServiceIncluded: boolean,
    typeTraveling: string,
  ): ContractTravel {
    return new ContractTravel(
      new ContractStatus(hasServiceIncluded ? 'pending' : 'none'),
      new ContractHasServiceIncluded(hasServiceIncluded),
      new TypeTraveling(typeTraveling as TypeTravelingType),
      new TravelAirlineReservation(
        new TravelCode(''),
        new TravelFlightNumber(''),
        new TravelDepartureAirport(''),
        new TravelDestinationAirport(''),
        new TravelDepartureDate(null),
      ),
      new TravelPetPerCharge(
        new TravelReceptor(''),
        new TravelEmail(''),
        new TravelPhone(''),
        new TravelPickupDataTime(null),
        new TravelPickupLocation(''),
        new TravelSpecialRequests(''),
      ),
    );
  }

  static converter(travel: TravelDefinition): ContractTravel {
    return new ContractTravel(
      new ContractStatus(travel.status === 'none' ? 'pending' : travel.status),
      new ContractHasServiceIncluded(travel.hasServiceIncluded),
      new TypeTraveling(travel.typeTraveling),
      new TravelAirlineReservation(
        new TravelCode(travel.airlineReservation.code),
        new TravelFlightNumber(travel.airlineReservation.flightNumber),
        new TravelDepartureAirport(travel.airlineReservation.departureAirport),
        new TravelDestinationAirport(
          travel.airlineReservation.destinationAirport,
        ),
        new TravelDepartureDate(travel.airlineReservation.departureDate),
      ),
      new TravelPetPerCharge(
        new TravelReceptor(travel.petPerCharge.receptor),
        new TravelEmail(travel.petPerCharge.email),
        new TravelPhone(travel.petPerCharge.phone),
        new TravelPickupDataTime(travel.petPerCharge.pickupDateTime),
        new TravelPickupLocation(travel.petPerCharge.pickupLocation),
        new TravelSpecialRequests(travel.petPerCharge.specialRequests),
      ),
    );
  }
}
