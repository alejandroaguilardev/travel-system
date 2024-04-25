import { UserDocumentNumber } from '../../../users/domain/value-object/profile/user-document-number';
import { UserEmail } from '../../../users/domain/value-object/user-email';
import { UserPassword } from '../../../users/domain/value-object/user-password';
import { UserDocument } from '../../../users/domain/value-object/profile/user-document';
import { HttpInterface } from '../../../common/application/services/http-service';

export class CredentialsMail {
  constructor(private readonly http: HttpInterface) {}

  async execute(
    email: UserEmail,
    document: UserDocument,
    documentNumber: UserDocumentNumber,
    password: UserPassword,
  ): Promise<void> {
    this.http
      .post(`/mail/user/register`, {
        email: email.value,
        document: document.value,
        documentNumber: documentNumber.value,
        password: password.value,
      })
      .catch((e) => console.log(e));
  }
}
