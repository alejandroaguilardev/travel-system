import { UserRepository } from '../../../src/users/domain/user.repository';

export const userRepositoryMockMethods = {
  search: jest.fn(),
  searchEmail: jest.fn(),
  searchById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
} as unknown as jest.Mocked<UserRepository>;
