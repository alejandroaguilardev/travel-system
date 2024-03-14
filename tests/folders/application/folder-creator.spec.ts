import { FolderMother } from '../domain/folder.mother';
import { folderRepositoryMock } from '../domain/folder.repository.mock';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandCreatorFolder } from '../../../src/folders/application/create/command-folder-creator';
import { FolderCreator } from '../../../src/folders/application/create/folder-creator';

describe('FolderCreator', () => {
  const folderCreator = new FolderCreator(folderRepositoryMock);

  it('should_successfully_folder_create', async () => {
    const folderDto = FolderMother.create();
    const user = UserCreatorMother.createWithPassword();
    const folder = CommandCreatorFolder.execute(folderDto, user.id);
    const expected = await folderCreator.create(folder, user);
    expect(expected.message).toBe(FolderCreator.messageSuccess());
  });
});
