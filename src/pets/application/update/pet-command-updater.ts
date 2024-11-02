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
import { PetInterface } from '../../domain/interfaces/pet.interface';
import { CreatePetRequest } from '../create/create-pet-request';
import { PetUpdatedAt } from '../../domain/value-object/pet-updated-at';
import { MeasurementsAndWeightInterface } from '../../domain/interfaces/pet-measurements-and-weight';
import { PetIsPuppy } from '../../domain/value-object/pet-is-puppy';

export class CommandPetUpdater {
  static execute(pet: PetInterface, data?: CreatePetRequest): Pet {
    return new Pet(
      new Uuid(pet.id),
      new PetName(data?.name ?? pet.name),
      new PetType(data?.type ?? pet.type),
      new PetRace(data?.race ?? pet.race),
      new PetGender(data?.gender ?? pet.gender),
      new PetDate(data?.birthDate ?? pet.birthDate),
      new PetChip(data?.chip ?? pet.chip),
      new PetChipDate(data?.chipDate ?? pet.chipDate),
      new PetColor(data?.color ?? pet.color),
      new PetImage(data?.image ?? pet.image),
      new PetCountry(data?.country ?? pet.country),
      new PetSterilized(data?.sterilized ?? pet.sterilized),
      new PetIsBrachycephalic(data?.isBrachycephalic ?? pet.isBrachycephalic),
      new PetIsPotentiallyDangerous(
        data?.isPotentiallyDangerous ?? pet.isPotentiallyDangerous,
      ),
      new StatusValueObject(pet.status),
      new Uuid(data?.adopter ?? pet.adopter),
      new UuidOptional(pet.user),
      new CageChosen(
        new CageChosenModel(
          data?.cageRecommendation?.modelCage ??
          pet.cageRecommendation.modelCage,
        ),
        new CageChosenType(
          data?.cageRecommendation?.typeCage ?? pet.cageRecommendation.typeCage,
        ),
        new CageChosenDimensions(
          data?.cageRecommendation?.dimensionsCage ??
          pet.cageRecommendation.dimensionsCage,
        ),
        new UuidOptional(''),
      ),
      new PetMeasurementsAndWeight(
        new PetWeight(
          data?.measurementsAndWeight?.weight ??
          pet.measurementsAndWeight.weight,
        ),
        new PetMeasurement(
          data?.measurementsAndWeight?.height ??
          pet.measurementsAndWeight.height,
        ),
        new PetMeasurement(
          data?.measurementsAndWeight?.length ??
          pet.measurementsAndWeight.length,
        ),
        new PetMeasurement(
          data?.measurementsAndWeight?.width ?? pet.measurementsAndWeight.width,
        ),
        new PetUpdatedAt(CommandPetUpdater.setPetUpdatedAt(data?.measurementsAndWeight, pet.measurementsAndWeight)),
      ),
      CommandContractTopico.execute(pet?.topico),
      new PetIsPuppy(data?.isPuppy ?? pet.isPuppy),
    );
  }

  private static setPetUpdatedAt(measurementsAndWeight: MeasurementsAndWeightInterface, newMeasurementsAndWeight: MeasurementsAndWeightInterface): Date {
    if (!measurementsAndWeight?.updatedAt) return new Date();

    const hasChanged =
      measurementsAndWeight.weight !== newMeasurementsAndWeight.weight ||
      measurementsAndWeight.height !== newMeasurementsAndWeight.height ||
      measurementsAndWeight.width !== newMeasurementsAndWeight.width ||
      measurementsAndWeight.length !== newMeasurementsAndWeight.length;

    return hasChanged ? new Date() : measurementsAndWeight.updatedAt;
  }
}
