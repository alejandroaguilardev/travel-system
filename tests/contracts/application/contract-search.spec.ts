import { ContractSearch } from '../../../src/contracts/application/search/contract-search';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { CriteriaMother } from '../../common/domain/criteria-mother';
import { CriteriaFactory } from '../../../src/common/application/criteria/criteria.factory';

describe('ContractSearch', () => {
  const contractSearch = new ContractSearch(contractRepositoryMock);

  it('should_successfully_contract_search', async () => {
    const criteriaRequest = CriteriaMother.create();
    const response = [
      ContractCreatorMother.create(),
      ContractCreatorMother.create(),
      ContractCreatorMother.create(),
      ContractCreatorMother.create(),
    ];
    contractRepositoryMock.search.mockResolvedValueOnce({
      count: response.length,
      response,
    });

    const expected = await contractSearch.execute(criteriaRequest);

    expect(expected).toEqual({ count: response.length, response });
    expect(expected.count).toEqual(response.length);
  });

  it('should_successfully_role_search_to_have_call', async () => {
    const criteriaRequest = CriteriaMother.create();
    const data = [
      ContractCreatorMother.create(),
      ContractCreatorMother.create(),
      ContractCreatorMother.create(),
      ContractCreatorMother.create(),
    ];

    const response = { count: data.length, rows: data };

    contractRepositoryMock.search.mockResolvedValueOnce(response);
    await contractSearch.execute(criteriaRequest);
    const criteria = CriteriaFactory.fromData(criteriaRequest);
    expect(contractRepositoryMock.search).toHaveBeenCalledWith(criteria);
  });
});
