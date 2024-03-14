import { FolderSearch } from '../../../src/folders/application/search/folder-search';
import { FolderMother } from '../domain/folder.mother';
import { folderRepositoryMock } from '../domain/folder.repository.mock';
import { CriteriaMother } from '../../common/domain/criteria-mother';
import { CommandCriteria } from '../../../src/common/application/criteria/command-criteria';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('FolderSearch', () => {
  const folderSearch = new FolderSearch(folderRepositoryMock);

  it('should_successfully_folder_search', async () => {
    const criteriaRequest = CriteriaMother.create();
    const criteria = CommandCriteria.fromData(criteriaRequest);
    const user = UserCreatorMother.createWithPassword();
    const response = [
      FolderMother.create(),
      FolderMother.create(),
      FolderMother.create(),
      FolderMother.create(),
    ];
    folderRepositoryMock.search.mockResolvedValueOnce({
      count: response.length,
      response,
    });

    const expected = await folderSearch.execute(criteria, user);

    expect(expected).toEqual({ count: response.length, response });
    expect(expected.count).toEqual(response.length);
  });

  it('should_successfully_role_search_to_have_call', async () => {
    const criteriaRequest = CriteriaMother.create();
    const user = UserCreatorMother.createWithPassword();
    const data = [
      FolderMother.create(),
      FolderMother.create(),
      FolderMother.create(),
      FolderMother.create(),
    ];
    const criteria = CommandCriteria.fromData(criteriaRequest);

    const response = { count: data.length, rows: data };

    folderRepositoryMock.search.mockResolvedValueOnce(response);
    await folderSearch.execute(criteria, user);
    const expected = CommandCriteria.fromData(criteriaRequest);
    expect(folderRepositoryMock.search).toHaveBeenCalledWith(expected);
  });
});
