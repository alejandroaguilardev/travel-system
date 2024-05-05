import {
  ContractStatusDetail,
  UuidOptional,
} from '../../../../common/domain/value-object';
import {
  TravelInterface,
  TravelPetPerChargeInterface,
} from '../../../domain/interfaces';
import {
  ContractGuideNumber,
  ContractHasServiceIncluded,
} from '../../../domain/value-object';
import { ContractTravel } from '../../../domain/value-object';
import { TravelName } from '../../../domain/value-object/travel/accompanied-pet/travel-name';
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
  TravelEmail,
  TravelPhone,
  ContractTypeTraveling,
} from '../../../domain/value-object/travel';
import { TravelAccompaniedPet } from '../../../domain/value-object/travel/accompanied-pet/travel-accompanied-pet';
import { TravelDestination } from '../../../domain/value-object/travel/destination/travel-destination';
import { TravelCountryDestination } from '../../../../contract-detail/domain/value-object/travel/destination/travel-country-destination';
import { TravelCityDestination } from '../../../../contract-detail/domain/value-object/travel/destination/travel-city-destination';
import { TravelDirectionDestination } from '../../../../contract-detail/domain/value-object/travel/destination/travel-direction-destination';
import { UserDirection } from '../../../../users/domain/value-object/profile/user-direction';
import { UserDistrict } from '../../../../users/domain/value-object/profile/user-district';
import { UserProvince } from '../../../../users/domain/value-object/profile/user-province';
import { UserDepartment } from '../../../../users/domain/value-object/profile/user-department';
import {
  TravelAccompaniedPetInterface,
  TravelDestinationInterface,
} from '../../../../contract-detail/domain/interfaces/travel.interface';
import { TravelDocument } from '../../../domain/value-object/travel/travel-document';
import { TravelDocumentNumber } from '../../../domain/value-object/travel/travel-document-number';
import { TravelObservation } from '../../../domain/value-object/travel/travel-observation';
import { TravelItinerary } from '../../../domain/value-object/travel/travel-itinerary';

export class CommandContractTravel {
  static execute(travel: TravelInterface): ContractTravel {
    return new ContractTravel(
      new ContractStatusDetail(travel.status),
      new ContractHasServiceIncluded(travel.hasServiceIncluded),
      new ContractHasServiceAccompanied(travel.hasServiceAccompanied),
      new ContractTypeTraveling(travel.typeTraveling),
      new TravelAirlineReservation(
        new TravelCode(travel.airlineReservation.code),
        new TravelFlightNumber(travel.airlineReservation.flightNumber),
        new TravelDepartureAirport(travel.airlineReservation.departureAirport),
        new TravelDestinationAirport(
          travel?.airlineReservation?.destinationAirport,
        ),
        new TravelDepartureDate(travel.airlineReservation.departureDate),
        new TravelArrivalDate(travel.airlineReservation?.arrivalDate),
        new TravelItinerary(travel.airlineReservation?.itinerary ?? ''),
        new UuidOptional(travel.airlineReservation?.user ?? ''),
      ),
      CommandContractTravel.travelPetPerCharge(travel?.petPerCharge),
      CommandContractTravel.travelAccompaniedPet(travel?.accompaniedPet),
      CommandContractTravel.travelDestination(travel?.destination),
      new ContractGuideNumber(travel?.guideNumber ?? ''),
      new TravelObservation(travel?.observation ?? ''),
    );
  }

  static travelPetPerCharge(petPerCharge?: TravelPetPerChargeInterface) {
    return new TravelPetPerCharge(
      new TravelName(petPerCharge?.name ?? ''),
      new TravelDocument(petPerCharge?.document ?? ''),
      new TravelDocumentNumber(petPerCharge?.documentNumber ?? ''),
      new TravelEmail(petPerCharge?.email ?? ''),
      new TravelPhone(petPerCharge?.phone ?? ''),
    );
  }

  static travelAccompaniedPet(accompaniedPet?: TravelAccompaniedPetInterface) {
    return new TravelAccompaniedPet(
      new TravelName(accompaniedPet?.name ?? ''),
      new TravelDocument(accompaniedPet?.document ?? ''),
      new TravelDocumentNumber(accompaniedPet?.documentNumber ?? ''),
      new TravelEmail(accompaniedPet?.email ?? ''),
      new TravelPhone(accompaniedPet?.phone ?? ''),
      new UserDirection(accompaniedPet?.direction ?? ''),
      new UserDistrict(accompaniedPet?.district ?? ''),
      new UserProvince(accompaniedPet?.province ?? ''),
      new UserDepartment(accompaniedPet?.department ?? ''),
    );
  }

  static travelDestination(destination?: Partial<TravelDestinationInterface>) {
    return new TravelDestination(
      new TravelCountryDestination(destination?.countryDestination ?? ''),
      new TravelCityDestination(destination?.cityDestination ?? ''),
      new TravelDirectionDestination(destination?.directionDestination ?? ''),
    );
  }
}
