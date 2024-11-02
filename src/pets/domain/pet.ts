import { Uuid } from '../../common/domain/value-object/uuid';
import { PetInterface } from './interfaces/pet.interface';
import { PetChip } from './value-object/pet-chip';
import { PetColor } from './value-object/pet-color';
import { PetDate } from './value-object/pet-date';
import { PetGender } from './value-object/pet-gender';
import { PetImage } from './value-object/pet-image';
import { PetName } from './value-object/pet-name';
import { PetRace } from './value-object/pet-race';
import { UuidOptional } from '../../common/domain/value-object/uuid-optional-value-object';
import { PetChipDate } from './value-object/pet-chip-date';
import { PetType } from './value-object/pet-type';
import { StatusValueObject } from '../../common/domain/value-object/status-value-object';
import { PetSterilized } from './value-object/pet-sterilized';
import { PetCountry } from './value-object/pet-country';
import { CageChosen } from '../../contract-detail/domain/value-object/cage/cage-chosen';
import { PetMeasurementsAndWeight } from './value-object/pet-measurements-and-weight';
import { PetIsBrachycephalic } from './value-object/pet-is-brachycephalic';
import { PetIsPotentiallyDangerous } from './value-object/pet-is-potentially-dangerous';
import { ContractTopico } from '../../contract-detail/domain/value-object/contract-topico';
import { PetIsPuppy } from './value-object/pet-is-puppy';

export class Pet {
  constructor(
    readonly id: Uuid,
    readonly name: PetName,
    readonly type: PetType,
    readonly race: PetRace,
    readonly gender: PetGender,
    readonly birthDate: PetDate,
    public chip: PetChip,
    public chipDate: PetChipDate,
    readonly color: PetColor,
    readonly image: PetImage,
    readonly country: PetCountry,
    readonly sterilized: PetSterilized,
    readonly isBrachycephalic: PetIsBrachycephalic,
    readonly isPotentiallyDangerous: PetIsPotentiallyDangerous,
    readonly status: StatusValueObject,
    readonly adopter: Uuid,
    readonly user: UuidOptional,
    readonly cageRecommendation: CageChosen,
    readonly measurementsAndWeight: PetMeasurementsAndWeight,
    readonly topico: ContractTopico,
    readonly isPuppy: PetIsPuppy,
  ) { }

  toJson(): PetInterface {
    return {
      id: this.id.value,
      name: this.name.value,
      type: this.type.value,
      race: this.race.value,
      gender: this.gender.value,
      birthDate: this.birthDate.value,
      chip: this.chip.value,
      chipDate: this.chipDate.value,
      color: this.color.value,
      image: this.image.value,
      country: this.country.value,
      sterilized: this.sterilized.value,
      status: this.status.value,
      adopter: this.adopter.value,
      user: this.user.value,
      isBrachycephalic: this.isBrachycephalic.value,
      isPotentiallyDangerous: this.isPotentiallyDangerous.value,
      cageRecommendation: this.cageRecommendation.toJson(),
      measurementsAndWeight: this.measurementsAndWeight.toJson(),
      topico: this.topico.toJson(),
      isPuppy: this.isPuppy.value,
    };
  }

  setChip(chip: PetChip) {
    this.chip = chip;
  }

  setChipDate(chipDate: PetChipDate) {
    this.chipDate = chipDate;
  }
}
