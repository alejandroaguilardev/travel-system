import { faker } from '@faker-js/faker';
import { CreatePetRequest } from '../../../src/pets/application/create/create-pet-request';
import { UuidMother } from '../../common/domain/uuid-mother';
import { PetChipMother } from './pet-chip.mother';

export class PetMother {
  static create(pet?: Partial<CreatePetRequest>): CreatePetRequest {
    return {
      id: pet?.id ?? UuidMother.create(),
      name: pet?.name ?? faker.person.firstName(),
      race: pet?.race ?? faker.person.jobTitle(),
      gender: pet?.gender ?? faker.person.sex(),
      birthDate: pet?.birthDate ?? faker.date.past(),
      chip: PetChipMother.create(pet?.chip),
      color: pet?.color ?? faker.color.human(),
      image: pet?.image ?? faker.internet.url(),
    };
  }
}
