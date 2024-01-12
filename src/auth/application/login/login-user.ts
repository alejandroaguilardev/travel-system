import { Hashing } from '../../../common/application/services/hashing';
import { JWT } from '../services/jwt';
import { InvalidArgumentError } from '../../../common/domain/value-object/invalid-argument-error';
import { UserRepository } from '../../../users/domain/user.repository';
import { UserEmail } from '../../../users/domain/user-email';
import { UserPassword } from '../../../users/domain/user-password';
import { UserAuth } from '../../domain/user-auth';
import { LoginResponse } from '../response/login.response';
import { LoginUserRequest } from './login-user-request';
import { GenerateToken } from '../token/generate';

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private readonly hashing: Hashing,
    private readonly jwt: JWT,
  ) {}

  async login(loginUserRequest: LoginUserRequest): Promise<LoginResponse> {
    const { email, password } = loginUserRequest;
    const credentials = new UserAuth(
      new UserEmail(email),
      new UserPassword(password),
    );

    const user = await this.userRepository.searchEmail(credentials.email);

    if (!user) {
      throw new InvalidArgumentError('El email es incorrecto');
    }

    if (
      !credentials.passwordMatches(
        new UserPassword(user.password),
        this.hashing,
      )
    ) {
      throw new InvalidArgumentError('El password es incorrecto');
    }

    delete user.password;
    const generateToken = new GenerateToken(this.jwt);
    const token = generateToken.execute(user.id);

    return {
      user,
      token,
    };
  }
}
