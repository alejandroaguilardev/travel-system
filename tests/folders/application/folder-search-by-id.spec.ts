import { folderRepositoryMock } from '../domain/folder.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { FolderSearchById } from '../../../src/folders/application/search-by-id/folder-search-by-id';
import { FolderMother } from '../domain/folder.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('FolderFind', () => {
  const folderSearchById = new FolderSearchById(folderRepositoryMock);

  it('should_successfully_folder_find_id', async () => {
    const dto = FolderMother.create();
    const user = UserCreatorMother.createWithPassword();
    folderRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await folderSearchById.execute(dto.id, user);
    expect(expected).toEqual(dto);
  });

  it('should_successfully_folder_find_id_to_have_call', async () => {
    const dto = FolderMother.create();
    const user = UserCreatorMother.createWithPassword();
    folderRepositoryMock.searchById.mockResolvedValueOnce(dto);
    await folderSearchById.execute(dto.id, user);
    const uuid = new Uuid(dto.id);
    expect(folderRepositoryMock.searchById).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_folder_find_id', async () => {
    const dto = FolderMother.create();
    const user = UserCreatorMother.createWithPassword();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    folderRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await folderSearchById.execute(dto.id, user);
      fail('should_failed_folder_find_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
