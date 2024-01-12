import { Injectable } from '@nestjs/common';
import { v4 as uuid, validate } from 'uuid';
import { UUID } from '../../application/services/uuid';

@Injectable()
export class UUIDService implements UUID {
  generate(): string {
    return uuid();
  }

  validate(uuid: string): boolean {
    if (validate(uuid)) {
      return true;
    }
    return false;
  }
}
