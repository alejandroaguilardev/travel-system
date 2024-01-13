import { userRepositoryMockMethods } from '../domain/user-repository-mock-methods';
import { UserRemover } from '../../../src/users/application/remove/user-remover';
import { UuidMother } from '../../common/domain/uuid-mother';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { LastNameMother } from '../domain/last-name-mother';
import { ErrorInvalidadArgument } from '../../../src/common/domain/errors/error-invalid-argument';
import { MessageDefault } from '../../../src/common/domain/response/response-message';

describe('UserRemover', () => {
  const removeMock = jest.fn();
  let userRemover: UserRemover;

  beforeEach(() => {
    const userRepositoryMock = {
      ...userRepositoryMockMethods,
      remove: removeMock,
    };
    userRemover = new UserRemover(userRepositoryMock);
  });

  it('should_successfully_updated_user', async () => {
    const id = UuidMother.create();
    const resolved = await userRemover.remove(id);
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });

  it('should_call_ remover_method_of_UserRepository', async () => {
    const id = UuidMother.create();
    await userRemover.remove(id);
    const uuid = new Uuid(id);
    expect(removeMock).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_uuid_remove_user', async () => {
    const userId = LastNameMother.create();
    const error = new ErrorInvalidadArgument(
      `<Uuid> No es un identificador válido <${userId}>`,
    );
    removeMock.mockRejectedValueOnce(error);
    try {
      await userRemover.remove(userId);
      fail('should failed uuid remove user');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
