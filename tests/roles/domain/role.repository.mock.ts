import { repositoryMock } from '../../common/domain/repository.mock';

export const roleRepositoryMock = {
  ...repositoryMock,
  searchByIdResponse: jest.fn(),
};
