import { Hashing } from '../../../common/application/services/hashing';
import { JWT } from '../services/jwt';
import { ErrorBadRequest } from '../../../common/domain/errors/error-bad-request';
import { UserRepository } from '../../../users/domain/user.repository';
import { UserEmail } from '../../../users/domain/value-object/user-email';
import { UserPassword } from '../../../users/domain/value-object/user-password';
import { Auth } from '../../domain/auth';
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
    const credentials = new Auth(
      new UserEmail(email),
      new UserPassword(password),
    );

    const user = await this.userRepository.searchEmail(credentials.email);

    if (!user) {
      throw new ErrorBadRequest('El correo electrónico es incorrecto');
    }

    if (
      !credentials.passwordMatches(
        new UserPassword(user.password),
        this.hashing,
      )
    ) {
      throw new ErrorBadRequest('La contraseña es incorrecta');
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
