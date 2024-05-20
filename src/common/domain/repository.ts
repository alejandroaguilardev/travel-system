import { Criteria } from './criteria/criteria';
import { ResponseSearch } from './response/response-search';
import { Uuid } from './value-object/uuid';

export interface Repository<T> {
  save(data: T): Promise<void>;
  search<R>(criteria: Criteria): Promise<ResponseSearch<R>>;
  searchById<R>(uuid: Uuid): Promise<R | null>;
  update(uuid: Uuid, data: Partial<T>): Promise<void>;
  remove(uuid: Uuid): Promise<void>;
}
