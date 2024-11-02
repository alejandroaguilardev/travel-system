import { UuidOptional } from '../../../common/domain/value-object/uuid-optional-value-object';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { Pet } from '../../domain/pet';
import { PetName } from '../../domain/value-object/pet-name';
import { PetRace } from '../../domain/value-object/pet-race';
import { PetGender } from '../../domain/value-object/pet-gender';
import { PetDate } from '../../domain/value-object/pet-date';
import { PetChip } from '../../domain/value-object/pet-chip';
import { PetColor } from '../../domain/value-object/pet-color';
import { PetImage } from '../../domain/value-object/pet-image';
import { CreatePetRequest } from './create-pet-request';
import { PetType } from '../../domain/value-object/pet-type';
import { PetChipDate } from '../../domain/value-object/pet-chip-date';
import { PetCountry } from '../../domain/value-object/pet-country';
import { StatusValueObject } from '../../../common/domain/value-object/status-value-object';
import { PetSterilized } from '../../domain/value-object/pet-sterilized';
import { CageChosen } from '../../../contract-detail/domain/value-object/cage/cage-chosen';
import { CageChosenModel } from '../../../cages/domain/value-object/cage-selected-model';
import { CageChosenType } from '../../../cages/domain/value-object/cage-selected-type';
import { CageChosenDimensions } from '../../../cages/domain/value-object/cage-selected-dimensions';
import { PetMeasurementsAndWeight } from '../../domain/value-object/pet-measurements-and-weight';
import { PetWeight } from '../../domain/value-object/pet-weight';
import { PetMeasurement } from '../../domain/value-object/pet-measurement';
import { PetIsBrachycephalic } from '../../domain/value-object/pet-is-brachycephalic';
import { PetIsPotentiallyDangerous } from '../../domain/value-object/pet-is-potentially-dangerous';
import { CommandContractTopico } from '../../../contract-detail/application/update/command/topico-command';
import { PetUpdatedAt } from '../../domain/value-object/pet-updated-at';
import { PetIsPuppy } from '../../domain/value-object/pet-is-puppy';

export class CommandPetCreator {
  static execute(data: CreatePetRequest, userId: string): Pet {
    return new Pet(
      new Uuid(data.id),
      new PetName(data.name),
      new PetType(data.type),
      new PetRace(data.race),
      new PetGender(data.gender),
      new PetDate(data.birthDate),
      new PetChip(data.chip),
      new PetChipDate(data.chipDate),
      new PetColor(data.color),
      new PetImage(data.image),
      new PetCountry(data.country),
      new PetSterilized(data.sterilized),
      new PetIsBrachycephalic(data.isBrachycephalic),
      new PetIsPotentiallyDangerous(data.isPotentiallyDangerous),
      new StatusValueObject('active'),
      new Uuid(data.adopter),
      new UuidOptional(userId),
      new CageChosen(
        new CageChosenModel(data?.cageRecommendation?.modelCage ?? ''),
        new CageChosenType(data?.cageRecommendation?.typeCage ?? ''),
        new CageChosenDimensions(
          data?.cageRecommendation?.dimensionsCage ?? '',
        ),
        new UuidOptional(''),
      ),
      new PetMeasurementsAndWeight(
        new PetWeight(data?.measurementsAndWeight?.weight ?? 0),
        new PetMeasurement(data?.measurementsAndWeight?.height ?? 0),
        new PetMeasurement(data?.measurementsAndWeight?.length ?? 0),
        new PetMeasurement(data?.measurementsAndWeight?.width ?? 0),
        new PetUpdatedAt(new Date()),
      ),
      CommandContractTopico.execute(data?.topico, undefined, userId),
      new PetIsPuppy(data?.isPuppy ?? false),

    );
  }
}
