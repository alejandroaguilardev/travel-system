import { faker } from '@faker-js/faker';
import { CreatePetRequest } from '../../../src/pets/application/create/create-pet-request';
import { UuidMother } from '../../common/domain/uuid-mother';
import { PetChipMother } from './pet-chip.mother';
import { PetGenderType } from '../../../src/pets/domain/value-object/pet-gender';
import { ChosenMother } from '../../contract-detail/domain/chosen.mother';
import { PetInterface } from '../../../src/pets/domain/interfaces/pet.interface';
import { ImageMother } from '../../common/domain/image.mother';

export class PetMother {
  static create(pet?: Partial<CreatePetRequest>): CreatePetRequest {
    return {
      id: pet?.id ?? UuidMother.create(),
      name: pet?.name ?? faker.person.firstName(),
      race: pet?.race ?? faker.person.jobTitle(),
      gender: pet?.gender ?? (faker.person.sex() as PetGenderType),
      birthDate: pet?.birthDate ?? faker.date.past(),
      chip: PetChipMother.create(pet?.chip),
      chipDate: pet?.chipDate ?? faker.date.recent(),
      color: pet?.color ?? faker.color.human(),
      image: pet?.image ?? ImageMother.create(),

      country: pet?.country ?? faker.location.country(),
      type: pet?.type ?? faker.animal.type(),
      sterilized: pet?.sterilized ?? faker.datatype.boolean() ? 'Si' : 'No',
      isBrachycephalic: pet?.isBrachycephalic ?? faker.datatype.boolean(),
      isPotentiallyDangerous:
        pet?.isPotentiallyDangerous ?? faker.datatype.boolean(),
      adopter: pet?.adopter ?? UuidMother.create(),
    };
  }

  static createPetInterface(pet?: Partial<PetInterface>): PetInterface {
    return {
      id: pet?.id ?? UuidMother.create(),
      name: pet?.name ?? faker.person.firstName(),
      race: pet?.race ?? faker.person.jobTitle(),
      gender: pet?.gender ?? (faker.person.sex() as PetGenderType),
      birthDate: pet?.birthDate ?? faker.date.past(),
      chip: PetChipMother.create(pet?.chip),
      chipDate: pet?.chipDate ?? faker.date.recent(),
      color: pet?.color ?? faker.color.human(),
      image: pet?.image ?? faker.internet.url(),

      country: pet?.country ?? faker.location.country(),
      type: pet?.type ?? faker.animal.type(),
      sterilized: pet?.sterilized ?? faker.datatype.boolean() ? 'Si' : 'No',
      isBrachycephalic: pet?.isBrachycephalic ?? faker.datatype.boolean(),
      isPotentiallyDangerous:
        pet?.isPotentiallyDangerous ?? faker.datatype.boolean(),
      adopter: pet?.adopter ?? UuidMother.create(),
      cageRecommendation: pet?.cageRecommendation ?? ChosenMother.create(),
      status: 'active',
      user: pet?.user ?? UuidMother.create(),
    };
  }
}
