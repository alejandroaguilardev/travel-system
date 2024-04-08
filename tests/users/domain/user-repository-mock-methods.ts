import { repositoryMock } from '../../common/domain/repository.mock';

export const userRepositoryMock = {
  ...repositoryMock,
  searchEmail: jest.fn(),
  searchDocument: jest.fn(),
  searchByIdWithRole: jest.fn(),
  updatePassword: jest.fn(),
  updateProfile: jest.fn(),
};
