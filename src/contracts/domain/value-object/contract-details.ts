import { Uuid } from '../../../common/domain/value-object/uuid';

export class ContractDetails {
  public value: Uuid[];

  constructor(details: string[]) {
    this.value = details.map((v) => new Uuid(v));
  }

  toJson(): string[] {
    return this.value.map((uuid) => uuid.value);
  }
}
