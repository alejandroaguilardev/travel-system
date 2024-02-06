import { UserCreatorMother } from '../domain/create-user-mother';
import { UserCreator } from '../../../src/users/application/create/user-creator';
import { ErrorInvalidadArgument } from '../../../src/common/domain/errors/error-invalid-argument';
import { userRepositoryMockMethods } from '../domain/user-repository-mock-methods';
import { BcryptService } from '../../../src/common/infrastructure/services/bcrypt.service';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { CommandCreatorUser } from '../../../src/users/application/create/command-create-user';

describe('userCreator', () => {
  const saveMock = jest.fn();
  const hashPasswordMock = jest.fn();
  let userCreator: UserCreator;

  beforeEach(() => {
    const userRepositoryMock = {
      ...userRepositoryMockMethods,
      save: saveMock,
    };

    const bcryptAdapterServiceMock = {
      hashPassword: hashPasswordMock,
      comparePasswords: jest.fn(),
    } as unknown as jest.Mocked<BcryptService>;

    userCreator = new UserCreator(userRepositoryMock, bcryptAdapterServiceMock);
  });

  it('should_successfully_create_a_new_user', async () => {
    const dto = UserCreatorMother.create();
    const userAuth = UserCreatorMother.createWithPassword();
    const user = CommandCreatorUser.execute(dto, userAuth.id);
    hashPasswordMock.mockReturnValueOnce(dto.password);
    saveMock.mockResolvedValueOnce(user);
    const resolved = await userCreator.create(user, userAuth);
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('should_call_ creator_method_of_UserRepository', async () => {
    const dto = UserCreatorMother.create();
    const userAuth = UserCreatorMother.createWithPassword();
    const user = CommandCreatorUser.execute(dto, userAuth.id);
    hashPasswordMock.mockReturnValueOnce(dto.password);
    saveMock.mockResolvedValueOnce(user);

    await userCreator.create(user, userAuth);
    expect(saveMock).toHaveBeenCalledWith(user);
  });

  it('should_handle_error_during_user_creation', async () => {
    const dto = UserCreatorMother.create({ email: 'ale' });
    const userAuth = UserCreatorMother.createWithPassword();
    const error = new ErrorInvalidadArgument(
      'No es un email válido de dominio',
    );
    saveMock.mockRejectedValue(error);
    try {
      const user = CommandCreatorUser.execute(dto, userAuth.id);
      await userCreator.create(user, userAuth);
      fail('Fallo la prueba should handle error during user creation');
    } catch (thrownError) {
      expect(thrownError.message).toBe(error.message);
    }
  });
});
