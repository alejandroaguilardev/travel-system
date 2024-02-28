import { ErrorBadRequest } from '../../../common/domain/errors/error-bad-request';
import { UserRepository } from '../../../users/domain/user.repository';
import { UserEmail } from '../../../users/domain/value-object/user-email';
import { UserResponse } from '../../../users/domain/interfaces/user.response';

export class RecoverPassword {
  constructor(private userRepository: UserRepository) {}

  async execute(emailRequest: string): Promise<UserResponse> {
    const email = new UserEmail(emailRequest);

    const user = await this.userRepository.searchEmail(email);

    if (!user) {
      throw new ErrorBadRequest('El email es incorrecto');
    }
    delete user.password;
    return user;
  }
}
