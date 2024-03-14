import { FolderUpdater } from '../../../src/folders/application/update/folder-updater';
import { FolderMother } from '../domain/folder.mother';
import { folderRepositoryMock } from '../domain/folder.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandCreatorFolder } from '../../../src/folders/application/create/command-folder-creator';

describe('FolderUpdater', () => {
  const folderUpdater: FolderUpdater = new FolderUpdater(folderRepositoryMock);

  it('should_successfully_folder_updater', async () => {
    const dto = FolderMother.create();
    const user = UserCreatorMother.createWithPassword();
    const folder = CommandCreatorFolder.execute(dto, user.id);

    folderRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await folderUpdater.execute(dto.id, folder, user);
    expect(expected.message).toBe(FolderUpdater.messageSuccess());
  });

  it('should_successfully_folder_updater_called_with', async () => {
    const dto = FolderMother.create();
    const user = UserCreatorMother.createWithPassword();
    const folder = CommandCreatorFolder.execute(dto, user.id);

    folderRepositoryMock.searchById.mockResolvedValueOnce(dto);
    await folderUpdater.execute(dto.id, folder, user);

    const uuid = new Uuid(dto.id);
    expect(folderRepositoryMock.update).toHaveBeenCalledWith(uuid, folder);
  });

  it('should_failed_folder_updater', async () => {
    const dto = FolderMother.create();
    const user = UserCreatorMother.createWithPassword();
    const folder = CommandCreatorFolder.execute(dto, user.id);

    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    folderRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await folderUpdater.execute(dto.id, folder, user);
      fail('should_failed_folder_updater');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
