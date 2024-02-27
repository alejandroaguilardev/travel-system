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

export class Pet {
  constructor(
    readonly id: Uuid,
    readonly name: PetName,
    readonly type: PetType,
    readonly race: PetRace,
    readonly gender: PetGender,
    readonly birthDate: PetDate,
    readonly chip: PetChip,
    readonly chipDate: PetChipDate,
    readonly color: PetColor,
    readonly image: PetImage,
    readonly country: PetCountry,
    readonly sterilized: PetSterilized,
    readonly status: StatusValueObject,
    readonly adopter: Uuid,
    readonly user: UuidOptional,
    readonly cageRecommendation: CageChosen,
  ) {}

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
      cageRecommendation: this.cageRecommendation.toJson(),
    };
  }
}
