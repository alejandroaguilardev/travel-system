import { Criteria } from './criteria/criteria';
import { ResponseSearch } from './response/response-search';
import { Uuid } from './value-object/uuid';

export interface Repository<T> {
  save(data: T): Promise<void>;
  search<R>(criteria: Criteria): Promise<ResponseSearch<R>>;
  searchById<R>(permissionId: Uuid): Promise<R>;
  update(permissionId: Uuid, permission: T): Promise<void>;
  remove(permissionId: Uuid): Promise<void>;
}
