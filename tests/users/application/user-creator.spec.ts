import { UserCreatorMother } from '../domain/create-user-mother';
import { UserCreator } from '../../../src/users/application/create/user-creator';
import { InvalidArgumentError } from '../../../src/common/domain/value-object/invalid-argument-error';
import { userRepositoryMockMethods } from '../domain/user-repository-mock-methods';
import { BcryptService } from '../../../src/common/infrastructure/services/bcrypt.service';
import { UserFactory } from '../../../src/users/domain/user-factory';
import { MessageDefault } from '../../../src/common/domain/response/response-message';

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
    const user = UserFactory.create(dto);
    hashPasswordMock.mockReturnValueOnce(dto.password);
    saveMock.mockResolvedValueOnce(user);
    const resolved = await userCreator.create(dto);
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('should_call_ creator_method_of_UserRepository', async () => {
    const dto = UserCreatorMother.create();
    const user = UserFactory.create(dto);
    hashPasswordMock.mockReturnValueOnce(dto.password);
    saveMock.mockResolvedValueOnce(user);

    await userCreator.create(dto);
    expect(saveMock).toHaveBeenCalledWith(user);
  });

  it('should_handle_error_during_user_creation', async () => {
    const newUser = UserCreatorMother.create({ email: 'ale' });
    const error = new InvalidArgumentError(
      'No es un email de usuario válido de dominio',
    );
    saveMock.mockRejectedValue(error);
    try {
      await userCreator.create(newUser);
      fail('Fallo la prueba should handle error during user creation');
    } catch (thrownError) {
      expect(thrownError.message).toBe(error.message);
    }
  });
});
