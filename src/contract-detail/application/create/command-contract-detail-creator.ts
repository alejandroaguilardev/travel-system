import {
  ContractStatus,
  Uuid,
  UuidOptional,
} from '../../../common/domain/value-object';
import { ContractDetail } from '../../domain/contract-detail';
import {
  CageInterface,
  StatusInterface,
  TypeTravelingType,
} from '../../domain/interfaces';
import {
  ContractHasServiceIncluded,
  ContractGuideNumber,
} from '../../domain/value-object';
import { ContractCage, ContractTravel } from '../../domain/value-object';
import { CageChosen } from '../../domain/value-object/cage';
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
} from '../../domain/value-object/travel';
import { ContractDetailCreateRequest } from './contract-detail-create-request';
import { CageChosenModel } from '../../../cages/domain/value-object/cage-selected-model';
import { CageChosenType } from '../../../cages/domain/value-object/cage-selected-type';
import { CageChosenDimensions } from '../../../cages/domain/value-object/cage-selected-dimensions';
import { CommandContractDocumentation } from '../update';

export class CommandContractDetailCreator {
  static execute(
    data: ContractDetailCreateRequest[],
    userId: string,
  ): ContractDetail[] {
    return data.map((detail) =>
      CommandContractDetailCreator.detail(detail, userId),
    );
  }

  static detail(
    data: ContractDetailCreateRequest,
    userId: string,
  ): ContractDetail {
    return new ContractDetail(
      new Uuid(data.id),
      CommandContractDocumentation.execute(data.documentation),
      new ContractCage(
        new ContractStatus(CommandContractDetailCreator.statusCage(data.cage)),
        new ContractHasServiceIncluded(data.cage.hasServiceIncluded),
        new CageChosen(
          new CageChosenModel(data.cage?.chosen?.modelCage ?? ''),
          new CageChosenType(data.cage?.chosen?.typeCage ?? ''),
          new CageChosenDimensions(data.cage?.chosen?.dimensionsCage ?? ''),
          new UuidOptional(data.cage?.chosen?.user),
        ),
        new CageChosen(
          new CageChosenModel(data.cage?.recommendation?.modelCage ?? ''),
          new CageChosenType(data.cage?.recommendation?.typeCage ?? ''),
          new CageChosenDimensions(
            data.cage?.recommendation?.dimensionsCage ?? '',
          ),
          new UuidOptional(''),
        ),
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
      new ContractGuideNumber(''),
      new Uuid(data.pet),
      new UuidOptional(userId),
    );
  }

  private static statusCage(cage: CageInterface): StatusInterface {
    if (
      cage?.chosen?.modelCage &&
      cage?.chosen?.typeCage &&
      cage?.chosen?.dimensionsCage
    ) {
      return 'completed';
    }
    return 'pending';
  }
}
