import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { CommandCriteria } from '../../../src/common/application/criteria/command-criteria';
import { ContractSearchPayments } from '../../../src/contracts/application/search-payments/contract-search-payments';
import { DayJsService } from '../../../src/common/infrastructure/services/dayjs.service';

describe('ContractSearchPayments', () => {
  const contractSearch = new ContractSearchPayments(
    contractRepositoryMock,
    new DayJsService(),
  );

  it('should_successfully_contract_search', async () => {
    const response = [
      ContractCreatorMother.createResponse(),
      ContractCreatorMother.createResponse(),
      ContractCreatorMother.createResponse(),
      ContractCreatorMother.createResponse(),
    ];
    contractRepositoryMock.searchPaymentsMissing.mockResolvedValueOnce(
      response,
    );

    const expected = await contractSearch.execute();

    expect(expected).toEqual(
      contractSearch.filterPayInInstallmentsNotPay(response),
    );
  });

  it('should_successfully_role_search_to_have_call', async () => {
    const response = [
      ContractCreatorMother.createResponse(),
      ContractCreatorMother.createResponse(),
      ContractCreatorMother.createResponse(),
      ContractCreatorMother.createResponse(),
    ];

    contractRepositoryMock.searchPaymentsMissing.mockResolvedValueOnce(
      response,
    );
    await contractSearch.execute();
    const criteria = CommandCriteria.fromData(contractSearch.criteria());
    expect(contractRepositoryMock.searchPaymentsMissing).toHaveBeenCalledWith(
      criteria,
    );
  });
});
