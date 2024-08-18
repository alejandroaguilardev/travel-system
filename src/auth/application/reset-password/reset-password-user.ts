import { UserRepository } from '../../../users/domain/user.repository';
import { UserPassword } from '../../../users/domain/value-object/user-password';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserEmail } from '../../../users/domain/value-object/user-email';
import { LoginResponse } from '../response/login.response';
import { GenerateToken } from '../token/generate';
import { Hashing } from '../../../common/application/services/hashing';
import { JWT } from '../services/jwt';

export class ResetPasswordUser {
  constructor(
    private userRepository: UserRepository,
    private readonly hashing: Hashing,
    private readonly jwt: JWT,
  ) { }

  async execute(
    password: UserPassword,
    user: UserWithoutWithRoleResponse,
  ): Promise<LoginResponse> {
    const uuid = new Uuid(user.id);
    const passwordUpdate = new UserPassword(
      this.hashing.hashPassword(password.value),
    );

    await this.userRepository.updatePassword(uuid, passwordUpdate);


    const generateToken = new GenerateToken(this.jwt);
    const token = generateToken.execute(user.id);

    return {
      user,
      token,
    };
  }
}
