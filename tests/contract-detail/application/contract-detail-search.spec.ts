import { ContractDetailSearch } from '../../../src/contract-detail/application/search/contract-detail-search';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { CriteriaMother } from '../../common/domain/criteria-mother';
import { CommandCriteria } from '../../../src/common/application/criteria/command-criteria';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('ContractDetailSearch', () => {
  const contractSearch = new ContractDetailSearch(contractDetailRepositoryMock);

  it('should_successfully_contract_search', async () => {
    const criteriaRequest = CriteriaMother.create();
    const user = UserCreatorMother.createWithPassword();
    const response = [
      ContractDetailCreatorMother.create(),
      ContractDetailCreatorMother.create(),
      ContractDetailCreatorMother.create(),
      ContractDetailCreatorMother.create(),
    ];
    contractDetailRepositoryMock.search.mockResolvedValueOnce({
      count: response.length,
      response,
    });

    const expected = await contractSearch.execute(criteriaRequest, user);

    expect(expected).toEqual({ count: response.length, response });
    expect(expected.count).toEqual(response.length);
  });

  it('should_successfully_role_search_to_have_call', async () => {
    const criteriaRequest = CriteriaMother.create();
    const data = [
      ContractDetailCreatorMother.create(),
      ContractDetailCreatorMother.create(),
      ContractDetailCreatorMother.create(),
      ContractDetailCreatorMother.create(),
    ];

    const response = { count: data.length, rows: data };

    contractDetailRepositoryMock.search.mockResolvedValueOnce(response);
    const user = UserCreatorMother.createWithPassword();
    await contractSearch.execute(criteriaRequest, user);
    const criteria = CommandCriteria.fromData(criteriaRequest);
    expect(contractDetailRepositoryMock.search).toHaveBeenCalledWith(criteria);
  });
});
