import { userRepositoryMock } from '../../users/domain/user-repository-mock-methods';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { BcryptService } from '../../../src/common/infrastructure/services/bcrypt.service';
import { JWTAdapterService } from '../../../src/auth/infrastructure/services/jwt.service';
import { UserPassword } from '../../../src/users/domain/value-object/user-password';
import { ResetPasswordUser } from '../../../src/auth/application/reset-password/reset-password-user';

describe('resetPassword', () => {
  const hashing = new BcryptService();
  const generateTokenMock = jest.fn();
  const jwtAdapterServiceMock = {
    generateToken: generateTokenMock,
    verifyToken: jest.fn(),
  } as unknown as jest.Mocked<JWTAdapterService>;

  const resetPasswordUser = new ResetPasswordUser(
    userRepositoryMock,
    hashing,
    jwtAdapterServiceMock,
  );

  it('should successfully log in a user with valid credentials', async () => {
    const user = UserCreatorMother.create();
    const password = UserPassword.generatePassword();
    const passwordHash = hashing.hashPassword(password);

    generateTokenMock.mockReturnValueOnce('token');
    userRepositoryMock.searchEmail.mockResolvedValueOnce({
      ...user,
      password: passwordHash,
    });
    const resolve = await resetPasswordUser.execute(
      new UserPassword(password),
      user,
    );

    expect(resolve.user.id).toEqual(user.id);
  });
});
