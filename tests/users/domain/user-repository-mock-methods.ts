import { repositoryMock } from '../../common/domain/repository.mock';

export const userRepositoryMock = {
  ...repositoryMock,
  searchEmail: jest.fn(),
  searchByIdWithRole: jest.fn(),
};
