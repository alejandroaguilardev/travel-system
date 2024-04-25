import { UserEmail } from '../../../users/domain/value-object/user-email';
import { HttpInterface } from '../../../common/application/services/http-service';

export class RecoverMail {
  constructor(private readonly http: HttpInterface) {}

  async execute(email: UserEmail, token: string): Promise<void> {
    this.http
      .post(`/mail/user/recover`, {
        email: email.value,
        token: token,
      })
      .catch((e) => console.log(e));
  }
}
