import { userRepositoryMock } from '../../users/domain/user-repository-mock-methods';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { BcryptService } from '../../../src/common/infrastructure/services/bcrypt.service';
import { UserPassword } from '../../../src/users/domain/value-object/user-password';
import { RecoverPassword } from '../../../src/auth/application/recover/recover-password';

describe('recover', () => {
  const hashing = new BcryptService();
  const generateTokenMock = jest.fn();
  const recoverPassword = new RecoverPassword(userRepositoryMock);

  it('should successfully log in a recover password  credentials', async () => {
    const user = UserCreatorMother.createWithPassword();
    const password = UserPassword.generatePassword();
    const passwordHash = hashing.hashPassword(password);

    generateTokenMock.mockReturnValueOnce('token');
    userRepositoryMock.searchEmail.mockResolvedValueOnce({
      ...user,
      password: passwordHash,
    });
    const resolve = await recoverPassword.execute(user.email);
    expect(resolve).toEqual(user);
  });
});
