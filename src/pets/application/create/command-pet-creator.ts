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
      new StatusValueObject('active'),
      new UuidOptional(userId),
    );
  }
}
