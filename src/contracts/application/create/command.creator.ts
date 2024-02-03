import { Uuid, UuidOptional } from '../../../common/domain/value-object';
import { Contract } from '../../../contracts/domain/contract';
import { TypeTravelingType } from '../../../contracts/domain/interfaces';
import {
  ContractNumber,
  ContractStatus,
  ContractStartDate,
  ContractEndDate,
  ContractServices,
  ContractHasServiceIncluded,
  ContractGuideNumber,
  ContractPets,
} from '../../../contracts/domain/value-object';
import {
  ContractCage,
  ContractTravel,
} from '../../../contracts/domain/value-object/services';
import {
  CageSwornDeclaration,
  CageChosen,
  CageChosenModel,
  CageChosenType,
  CageChosenDimensions,
  CageRecommendation,
} from '../../../contracts/domain/value-object/services/cage';
import {
  ContractHasServiceAccompanied,
  ContractTypeTraveling,
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
} from '../../../contracts/domain/value-object/services/travel';
import { CommandContractDocumentation } from '../update/command/command-documentation';
import { ContractCreateRequest } from './contract-create-request';

export class CommandContractCreator {
  static execute(data: ContractCreateRequest, userId: string): Contract {
    return new Contract(
      new Uuid(data.id),
      new ContractNumber(data.number),
      new Uuid(data.client),
      new ContractStatus('pending'),
      new ContractStartDate(data.startDate),
      new ContractEndDate(null),
      new ContractServices(
        CommandContractDocumentation.execute(data.documentation),
        new ContractCage(
          new ContractStatus(
            data.cage.status === 'none' ? 'pending' : data.cage.status,
          ),
          new ContractHasServiceIncluded(data.cage.hasServiceIncluded),
          new CageSwornDeclaration(data.cage.swornDeclaration),
          new CageChosen(
            new CageChosenModel(data.cage?.chosen?.modelCage ?? ''),
            new CageChosenType(data.cage?.chosen?.typeCage ?? ''),
            new CageChosenDimensions(data.cage?.chosen?.dimensionsCage ?? ''),
            new UuidOptional(''),
          ),
          new CageRecommendation(data.cage.recommendation),
        ),
        new ContractTravel(
          new ContractStatus('pending'),
          new ContractHasServiceIncluded(data.travel.hasServiceIncluded),
          new ContractHasServiceAccompanied(data.travel.hasServiceAccompanied),
          new ContractTypeTraveling(
            data.travel.typeTraveling as TypeTravelingType,
          ),
          new TravelAirlineReservation(
            new TravelCode(''),
            new TravelFlightNumber(''),
            new TravelDepartureAirport(''),
            new TravelDestinationAirport(''),
            new TravelDepartureDate(null),
            new TravelArrivalDate(null),
            new UuidOptional(''),
          ),
          new TravelPetPerCharge(
            new TravelReceptor(''),
            new TravelEmail(''),
            new TravelPhone(''),
            new TravelPickupDataTime(null),
            new TravelPickupLocation(''),
            new TravelSpecialRequests(''),
            new UuidOptional(''),
          ),
        ),
      ),
      new ContractGuideNumber(''),
      new ContractPets(data.pets),
      new UuidOptional(userId),
    );
  }
}
