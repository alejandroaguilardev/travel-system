import { UserRepository } from '../../../src/users/domain/user.repository';
import { userRepositoryMockMethods } from '../../users/domain/user-repository-mock-methods';
import { LoginUser } from '../../../src/auth/application/login/login-user';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { BcryptService } from '../../../src/common/infrastructure/services/bcrypt.service';
import { JWTAdapterService } from '../../../src/auth/infrastructure/services/jwt.service';
import { InvalidArgumentError } from '../../../src/common/domain/value-object/invalid-argument-error';
import { PasswordMother } from '../../users/domain/password-mother';

describe('loginUser', () => {
  const hashing = new BcryptService();
  const searchEmailMock = jest.fn();
  let generateTokenMock: jest.Mock;
  let loginUser: LoginUser;
  let jwtAdapterServiceMock: jest.Mocked<JWTAdapterService>;

  beforeEach(() => {
    generateTokenMock = jest.fn();

    jwtAdapterServiceMock = {
      generateToken: generateTokenMock,
      verifyToken: jest.fn(),
    } as unknown as jest.Mocked<JWTAdapterService>;

    const userRepositoryMock = {
      ...userRepositoryMockMethods,
      searchEmail: searchEmailMock,
    } as unknown as jest.Mocked<UserRepository>;

    loginUser = new LoginUser(
      userRepositoryMock,
      hashing,
      jwtAdapterServiceMock,
    );
  });

  it('should successfully log in a user with valid credentials', async () => {
    const dto = UserCreatorMother.create();
    const { password, ...user } = dto;
    const passwordHash = hashing.hashPassword(password);
    generateTokenMock.mockReturnValueOnce('123');
    searchEmailMock.mockResolvedValueOnce({ ...dto, password: passwordHash });
    const resolve = await loginUser.login({ email: user.email, password });
    expect(resolve).toEqual({ user, token: '123' });
  });

  it('should successfully  jwt is valid ', async () => {
    const dto = UserCreatorMother.create();
    const { password, ...user } = dto;
    const passwordHash = hashing.hashPassword(password);

    generateTokenMock.mockReturnValueOnce('123');
    searchEmailMock.mockResolvedValueOnce({ ...dto, password: passwordHash });
    const resolve = await loginUser.login({ email: user.email, password });
    expect(resolve).toEqual({ user, token: '123' });
  });

  it('should failed log email credentials', async () => {
    const dto = UserCreatorMother.create();
    const { email, password } = dto;
    generateTokenMock.mockReturnValueOnce('123');
    searchEmailMock.mockResolvedValue(null);

    const error = new InvalidArgumentError('El email es incorrecto');
    try {
      await loginUser.login({ email, password });
      fail('Fallo la prueba should failed log email credentials');
    } catch (thrownError) {
      expect(thrownError.message).toBe(error.message);
    }
  });

  it('should failed log password credentials', async () => {
    const dto = UserCreatorMother.create();
    const { password } = dto;
    const passwordHash = hashing.hashPassword(password);

    const passwordIncorrect = PasswordMother.create();

    generateTokenMock.mockReturnValueOnce('123');
    searchEmailMock.mockResolvedValueOnce({ ...dto, password: passwordHash });

    const error = new InvalidArgumentError('El password es incorrecto');
    try {
      await loginUser.login({ email: dto.email, password: passwordIncorrect });
      fail('Fallo la prueba should failed log password credentials');
    } catch (thrownError) {
      expect(thrownError.message).toBe(error.message);
    }
  });
});
