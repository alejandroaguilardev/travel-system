import { InvalidArgumentError } from './invalid-argument-error';
import { ValueObject } from './value-object';

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }

  private ensureIsValidUuid(id: string): void {
    if (!this.isValidUUID(id)) {
      throw new InvalidArgumentError(
        `<${this?.constructor?.name}> No es un identificador válido <${id}>`,
      );
    }
  }

  private isValidUUID(uuid: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(uuid);
  }
}
