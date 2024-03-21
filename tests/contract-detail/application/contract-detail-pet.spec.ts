import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { ContractDetailPetUpdater } from '../../../src/contract-detail/application/pet/contract-detail-pet-updater';
import { DetailPetMother } from '../domain/pet.mother';

describe('ContractDetailPetUpdater', () => {
  const contractDetailPetUpdater = new ContractDetailPetUpdater(
    contractRepositoryMock,
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_pet', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel();

    const petRequest = DetailPetMother.create();
    const user = UserCreatorMother.createWithPassword();

    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);
    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(
      contractDetail,
    );

    const expected = await contractDetailPetUpdater.execute(
      contract.id,
      petRequest,
      user,
    );

    expect(expected.message).toBe(ContractDetailPetUpdater.messageSuccess());
  });

  it('should_failed_contract_pet', async () => {
    const contract = ContractCreatorMother.createWithTravel();

    const petRequest = DetailPetMother.create();
    const user = UserCreatorMother.createWithPassword();

    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractDetailPetUpdater.execute(contract.id, petRequest, user);

      fail('should_failed_contract_pet');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
