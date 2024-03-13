import { userRepositoryMock } from '../domain/user-repository-mock-methods';
import { UserRemover } from '../../../src/users/application/remove/user-remover';
import { UuidMother } from '../../common/domain/uuid-mother';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { LastNameMother } from '../domain/last-name-mother';
import { ErrorInvalidadArgument } from '../../../src/common/domain/errors/error-invalid-argument';
import { UserCreatorMother } from '../domain/create-user-mother';

describe('UserRemover', () => {
  const userRemover = new UserRemover(userRepositoryMock);

  it('should_successfully_updated_user', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    const resolved = await userRemover.remove(id, user);
    expect(resolved.message).toBe(UserRemover.messageSuccess());
  });

  it('should_call_ remover_method_of_UserRepository', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    await userRemover.remove(id, user);
    const uuid = new Uuid(id);
    expect(userRepositoryMock.remove).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_uuid_remove_user', async () => {
    const userId = LastNameMother.create();
    const error = new ErrorInvalidadArgument(
      `<Uuid> No es un identificador válido <${userId}>`,
    );
    userRepositoryMock.remove.mockRejectedValueOnce(error);
    try {
      const user = UserCreatorMother.createWithPassword();
      await userRemover.remove(userId, user);
      fail('should failed uuid remove user');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
