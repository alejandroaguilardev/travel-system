import { UserPassword } from '../../users/domain/value-object/user-password';
import { Hashing } from '../../common/application/services/hashing';
import { UserDocumentNumber } from '../../users/domain/value-object/profile/user-document-number';
import { UserDocument } from '../../users/domain/value-object/profile/user-document';

export class Auth {
  constructor(
    readonly document: UserDocument,
    readonly documentNumber: UserDocumentNumber,
    readonly password: UserPassword,
  ) {}

  passwordMatches(password: UserPassword, hashing: Hashing): boolean {
    return hashing.comparePasswords(this.password.value, password.value);
  }
}
