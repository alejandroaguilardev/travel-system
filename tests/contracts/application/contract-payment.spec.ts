import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { ContractPayInInstallmentsUpdater } from '../../../src/contracts/application/update/payment-updater';
import { faker } from '@faker-js/faker';
import { PayInInstallmentMother } from '../domain/pay-in-installments.mother';

describe('ContractPaymentUpdater', () => {
  const contractPayInInstallmentsUpdater = new ContractPayInInstallmentsUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_PaymentUpdater', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const dto = PayInInstallmentMother.create(
      faker.number.int({ min: 0, max: 10 }),
    );
    const user = UserCreatorMother.createWithPassword();
    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);

    const expected = await contractPayInInstallmentsUpdater.execute(
      contract.id,
      dto,
      user,
    );
    expect(expected.message).toBe(
      ContractPayInInstallmentsUpdater.messageSuccess(),
    );
  });
});
