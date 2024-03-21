import { FolderRemover } from '../../../src/folders/application/remove/folder-remover';
import { folderRepositoryMock } from '../domain/folder.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { UuidMother } from '../../common/domain/uuid-mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('FolderRemover', () => {
  const folderRemover = new FolderRemover(folderRepositoryMock);

  it('should_successfully_remover_folder', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    const expected = await folderRemover.execute(id, user);
    expect(expected.message).toBe(FolderRemover.messageSuccess());
  });

  it('should_successfully_remover_folder_to_have_called', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    await folderRemover.execute(id, user);
    const uuid = new Uuid(id);
    expect(folderRepositoryMock.remove).toHaveBeenCalledWith(uuid);
  });
});
