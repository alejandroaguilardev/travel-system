import { Uuid } from '../../../common/domain/value-object/uuid';

export class ContractPets {
  public value: Uuid[];

  constructor(pets: string[]) {
    this.value = pets.map((v) => new Uuid(v));
  }

  toJson(): string[] {
    return this.value.map((uuid) => uuid.value);
  }
}
