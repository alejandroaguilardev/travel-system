import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { ContractDetailSearchById } from '../../../src/contract-detail/application/search-by-id/contract-detail-search-by-id';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { PetMother } from '../../pet/domain/pet.mother';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';

describe('ContractDetailFind', () => {
  const contractSearchById = new ContractDetailSearchById(
    contractRepositoryMock,
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_find_id', async () => {
    const pet = PetMother.createPetInterface();
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel({
      pet: pet.id,
    });
    const user = UserCreatorMother.createWithPassword();

    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);
    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(
      contractDetail,
    );
    contractDetailRepositoryMock.searchByIdWithPet.mockResolvedValueOnce({
      ...contractDetail,
      pet,
    });

    const expected = await contractSearchById.execute(
      contract.id,
      contractDetail.id,
      user,
    );
    expect(expected.id).toEqual(contractDetail.id);
  });

  it('should_successfully_contract_find_id_to_have_call', async () => {
    const pet = PetMother.createPetInterface();
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel({
      pet: pet.id,
    });
    const user = UserCreatorMother.createWithPassword();

    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);
    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(
      contractDetail,
    );
    contractDetailRepositoryMock.searchByIdWithPet.mockResolvedValueOnce({
      ...contractDetail,
      pet,
    });

    await contractSearchById.execute(contract.id, contractDetail.id, user);
    const uuid = new Uuid(contractDetail.id);
    expect(contractDetailRepositoryMock.searchById).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_contract_find_id', async () => {
    const pet = PetMother.createPetInterface();
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel({
      pet: pet.id,
    });
    const user = UserCreatorMother.createWithPassword();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractDetailRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractSearchById.execute(contract.id, contractDetail.id, user);
      fail('should_failed_contract_find_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
