import { UserCreatorMother } from '../domain/create-user-mother';
import { UserCreator } from '../../../src/users/application/create/user-creator';
import { ErrorInvalidadArgument } from '../../../src/common/domain/errors/error-invalid-argument';
import { userRepositoryMock } from '../domain/user-repository-mock-methods';
import { BcryptService } from '../../../src/common/infrastructure/services/bcrypt.service';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { CommandCreatorUser } from '../../../src/users/application/create/command-create-user';
import { UserPassword } from '../../../src/users/domain/value-object/user-password';

describe('userCreator', () => {
  const hashPasswordMock = jest.fn();
  const bcryptAdapterServiceMock = {
    hashPassword: hashPasswordMock,
    comparePasswords: jest.fn(),
  } as unknown as jest.Mocked<BcryptService>;

  const userCreator = new UserCreator(
    userRepositoryMock,
    bcryptAdapterServiceMock,
  );

  it('should_successfully_create_a_new_user', async () => {
    const dto = UserCreatorMother.create();
    const userAuth = UserCreatorMother.createWithPassword();
    const user = CommandCreatorUser.execute(dto, userAuth.id);
    const userPassword = new UserPassword(UserPassword.generatePassword());
    hashPasswordMock.mockReturnValueOnce(userPassword.value);
    userRepositoryMock.save.mockResolvedValueOnce(user);
    const resolved = await userCreator.create(user, userPassword, userAuth);
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('should_call_creator_method_of_UserRepository', async () => {
    const dto = UserCreatorMother.create();
    const userAuth = UserCreatorMother.createWithPassword();
    const user = CommandCreatorUser.execute(dto, userAuth.id);
    const userPassword = new UserPassword(UserPassword.generatePassword());

    hashPasswordMock.mockReturnValueOnce(userPassword.value);
    userRepositoryMock.save.mockResolvedValueOnce(user);

    await userCreator.create(user, userPassword, userAuth);
    expect(userRepositoryMock.save).toHaveBeenCalledWith(user);
  });

  it('should_handle_error_during_user_creation', async () => {
    const dto = UserCreatorMother.create({ email: 'ale' });
    const userAuth = UserCreatorMother.createWithPassword();
    const error = new ErrorInvalidadArgument(
      'No es un email válido de dominio',
    );
    userRepositoryMock.save.mockRejectedValue(error);
    const userPassword = new UserPassword(UserPassword.generatePassword());

    try {
      const user = CommandCreatorUser.execute(dto, userAuth.id);
      await userCreator.create(user, userPassword, userAuth);
      fail('Fallo la prueba should handle error during user creation');
    } catch (thrownError) {
      expect(thrownError.message).toBe(error.message);
    }
  });
});
