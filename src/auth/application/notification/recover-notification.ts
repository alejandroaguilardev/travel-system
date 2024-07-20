import { UserEmail } from '../../../users/domain/value-object/user-email';
import { HttpInterface } from '../../../common/application/services/http-service';

export class RecoverNotification {
  constructor(private readonly http: HttpInterface) { }

  async execute(email: UserEmail, token: string): Promise<void> {
    this.http
      .post(`/notification/user/recover`, {
        email: email.value,
        token: token,
      })
      .then((e) => {
        console.log(e)
      })
      .catch((e) => console.log(e));
  }
}
