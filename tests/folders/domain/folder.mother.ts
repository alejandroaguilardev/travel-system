import { faker } from '@faker-js/faker';
import { UuidMother } from '../../common/domain/uuid-mother';
import { CreateFolderRequest } from '../../../src/folders/application/create/create-folder-request';

export class FolderMother {
  static create(folder?: Partial<CreateFolderRequest>): CreateFolderRequest {
    return {
      id: folder?.id ?? UuidMother.create(),
      name: folder?.name ?? 'Folder-' + faker.number.int(),
      quantity: folder?.quantity ?? faker.number.int({ min: 1, max: 500 }),
      user: folder?.user ?? UuidMother.create(),
    };
  }
}
