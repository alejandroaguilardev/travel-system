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

export class Pet {
  constructor(
    readonly id: Uuid,
    readonly name: PetName,
    readonly race: PetRace,
    readonly gender: PetGender,
    readonly birthDate: PetDate,
    readonly chip: PetChip,
    readonly color: PetColor,
    readonly image: PetImage,
    readonly user: UuidOptional,
  ) {}

  toJson(): PetInterface {
    return {
      id: this.id.value,
      name: this.name.value,
      race: this.race.value,
      gender: this.gender.value,
      birthDate: this.birthDate.value,
      chip: this.chip.value,
      color: this.color.value,
      image: this.image.value,
      user: this.user.value,
    };
  }
}
