export const contractRepositoryMock = {
  save: jest.fn(),
  remove: jest.fn(),
  searchById: jest.fn(),
  search: jest.fn(),
  searchPendingStartDate: jest.fn(),
  searchPaymentsMissing: jest.fn(),
  findFinishAndUpdateReview: jest.fn(),
  update: jest.fn(),
  finish: jest.fn(),
  cancel: jest.fn(),
  searchContractByClient: jest.fn(),
  searchByIdWithPet: jest.fn(),
  updateFolder: jest.fn(),
  updateDetail: jest.fn(),
  updatePayment: jest.fn(),
};
