import { Hashing } from '../../../common/application/services/hashing';
import { JWT } from '../services/jwt';
import { ErrorBadRequest } from '../../../common/domain/errors/error-bad-request';
import { UserRepository } from '../../../users/domain/user.repository';
import { UserPassword } from '../../../users/domain/value-object/user-password';
import { Auth } from '../../domain/auth';
import { LoginResponse } from '../response/login.response';
import { LoginUserRequest } from './login-user-request';
import { GenerateToken } from '../token/generate';
import { UserDocument } from '../../../users/domain/value-object/profile/user-document';
import { UserDocumentNumber } from '../../../users/domain/value-object/profile/user-document-number';
import { Uuid } from '../../../common/domain/value-object/uuid';

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private readonly hashing: Hashing,
    private readonly jwt: JWT,
  ) { }

  async login(loginUserRequest: LoginUserRequest): Promise<LoginResponse> {
    const { document, documentNumber, password } = loginUserRequest;
    const credentials = new Auth(
      new UserDocument(document),
      new UserDocumentNumber(documentNumber),
      new UserPassword(password),
    );

    const findByDocumentUser = await this.userRepository.searchDocument(
      credentials.document,
      credentials.documentNumber,
    );

    if (!findByDocumentUser) {
      throw new ErrorBadRequest('El documento es incorrecto');
    }

    if (
      !credentials.passwordMatches(
        new UserPassword(findByDocumentUser.password),
        this.hashing,
      )
    ) {
      throw new ErrorBadRequest('La contraseña es incorrecta');
    }

    const user = await this.userRepository.searchByIdWithRole(new Uuid(findByDocumentUser.id));
    const generateToken = new GenerateToken(this.jwt);
    const token = generateToken.execute(user.id);

    return {
      user,
      token,
    };
  }
}
