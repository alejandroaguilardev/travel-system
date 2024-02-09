import { CageSearch } from '../../../src/cages/application/search/cage-search';
import { CageMother } from '../domain/cage.mother';
import { cageRepositoryMock } from '../domain/cage.repository.mock';
import { CriteriaMother } from '../../common/domain/criteria-mother';
import { CommandCriteria } from '../../../src/common/application/criteria/command-criteria';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('CageSearch', () => {
  const cageSearch = new CageSearch(cageRepositoryMock);

  it('should_successfully_cage_search', async () => {
    const criteriaRequest = CriteriaMother.create();
    const criteria = CommandCriteria.fromData(criteriaRequest);
    const user = UserCreatorMother.createWithPassword();
    const response = [
      CageMother.create(),
      CageMother.create(),
      CageMother.create(),
      CageMother.create(),
    ];
    cageRepositoryMock.search.mockResolvedValueOnce({
      count: response.length,
      response,
    });

    const expected = await cageSearch.execute(criteria, user);

    expect(expected).toEqual({ count: response.length, response });
    expect(expected.count).toEqual(response.length);
  });

  it('should_successfully_role_search_to_have_call', async () => {
    const criteriaRequest = CriteriaMother.create();
    const user = UserCreatorMother.createWithPassword();
    const data = [
      CageMother.create(),
      CageMother.create(),
      CageMother.create(),
      CageMother.create(),
    ];
    const criteria = CommandCriteria.fromData(criteriaRequest);

    const response = { count: data.length, rows: data };

    cageRepositoryMock.search.mockResolvedValueOnce(response);
    await cageSearch.execute(criteria, user);
    const expected = CommandCriteria.fromData(criteriaRequest);
    expect(cageRepositoryMock.search).toHaveBeenCalledWith(expected);
  });
});
