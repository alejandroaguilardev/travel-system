import { repositoryMock } from '../../common/domain/repository.mock';

export const petRepositoryMock = {
  ...repositoryMock,
  searchByChip: jest.fn(),
  updateTopico: jest.fn(),
  searchByClient: jest.fn(),
};
