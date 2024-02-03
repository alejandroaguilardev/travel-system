import { UuidOptional } from '../../../../common/domain/value-object';
import { TravelInterface } from '../../../domain/interfaces';
import {
  ContractStatus,
  ContractHasServiceIncluded,
} from '../../../domain/value-object';
import { ContractTravel } from '../../../domain/value-object/services';
import {
  ContractHasServiceAccompanied,
  TravelAirlineReservation,
  TravelCode,
  TravelFlightNumber,
  TravelDepartureAirport,
  TravelDestinationAirport,
  TravelDepartureDate,
  TravelArrivalDate,
  TravelPetPerCharge,
  TravelReceptor,
  TravelEmail,
  TravelPhone,
  TravelPickupDataTime,
  TravelPickupLocation,
  TravelSpecialRequests,
  ContractTypeTraveling,
} from '../../../domain/value-object/services/travel';

export class CommandContractTravel {
  x;
  static execute(travel: TravelInterface): ContractTravel {
    return new ContractTravel(
      new ContractStatus(travel.status),
      new ContractHasServiceIncluded(travel.hasServiceIncluded),
      new ContractHasServiceAccompanied(travel.hasServiceAccompanied),
      new ContractTypeTraveling(travel.typeTraveling),
      new TravelAirlineReservation(
        new TravelCode(travel.airlineReservation.code),
        new TravelFlightNumber(travel.airlineReservation.flightNumber),
        new TravelDepartureAirport(travel.airlineReservation.departureAirport),
        new TravelDestinationAirport(
          travel.airlineReservation.destinationAirport,
        ),
        new TravelDepartureDate(travel.airlineReservation.departureDate),
        new TravelArrivalDate(travel.airlineReservation.arrivalDate),
        new UuidOptional(travel.airlineReservation?.user ?? ''),
      ),
      new TravelPetPerCharge(
        new TravelReceptor(travel.petPerCharge.receptor),
        new TravelEmail(travel.petPerCharge.email),
        new TravelPhone(travel.petPerCharge.phone),
        new TravelPickupDataTime(travel.petPerCharge.pickupDateTime),
        new TravelPickupLocation(travel.petPerCharge.pickupLocation),
        new TravelSpecialRequests(travel.petPerCharge.specialRequests),
        new UuidOptional(travel.airlineReservation?.user ?? ''),
      ),
    );
  }
}
