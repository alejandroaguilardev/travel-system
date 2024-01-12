import { Uuid } from '../../common/domain/value-object/uuid';

export class UserRole {
  value: Uuid[];

  constructor(roles: string[]) {
    this.value = roles.map((v) => new Uuid(v));
  }

  toPrimitive(): string[] {
    return this.value.map((uuid) => uuid.value);
  }
}
