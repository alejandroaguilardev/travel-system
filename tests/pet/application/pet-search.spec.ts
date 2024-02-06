import { PetSearch } from '../../../src/pets/application/search/pet-search';
import { PetMother } from '../domain/pet.mother';
import { petRepositoryMock } from '../domain/pet.repository.mock';
import { CriteriaMother } from '../../common/domain/criteria-mother';
import { CommandCriteria } from '../../../src/common/application/criteria/command-criteria';

describe('PetSearch', () => {
  const petSearch = new PetSearch(petRepositoryMock);

  it('should_successfully_pet_search', async () => {
    const criteriaRequest = CriteriaMother.create();
    const criteria = CommandCriteria.fromData(criteriaRequest);
    const response = [
      PetMother.create(),
      PetMother.create(),
      PetMother.create(),
      PetMother.create(),
    ];
    petRepositoryMock.search.mockResolvedValueOnce({
      count: response.length,
      response,
    });

    const expected = await petSearch.execute(criteria);

    expect(expected).toEqual({ count: response.length, response });
    expect(expected.count).toEqual(response.length);
  });

  it('should_successfully_role_search_to_have_call', async () => {
    const criteriaRequest = CriteriaMother.create();
    const data = [
      PetMother.create(),
      PetMother.create(),
      PetMother.create(),
      PetMother.create(),
    ];
    const criteria = CommandCriteria.fromData(criteriaRequest);

    const response = { count: data.length, rows: data };

    petRepositoryMock.search.mockResolvedValueOnce(response);
    await petSearch.execute(criteria);
    const expected = CommandCriteria.fromData(criteriaRequest);
    expect(petRepositoryMock.search).toHaveBeenCalledWith(expected);
  });
});
