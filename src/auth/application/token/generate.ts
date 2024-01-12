import { JWT } from '../services/jwt';
import { Uuid } from '../../../common/domain/value-object/uuid';

export class GenerateToken {
  constructor(private readonly jwt: JWT) {}

  execute(id: string): string {
    const uuid = new Uuid(id);
    return this.jwt.generateToken({ id: uuid.value });
  }
}
