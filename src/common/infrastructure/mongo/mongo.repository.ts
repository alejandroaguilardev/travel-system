import { Injectable } from '@nestjs/common';
import { Model as ModelMongoose } from 'mongoose';
import { Criteria } from '../../domain/criteria/criteria';
import { MongoCriteriaConverter } from './mongo-criteria-converter';
import { ResponseSearch } from '../../domain/response/response-search';
import { Uuid } from 'src/common/domain/value-object/uuid';
import { Repository } from '../../domain/repository';

interface ToJsonFunction {
  (): Record<string, any>;
}

@Injectable()
export class MongoRepository<Model, T extends { toJson: ToJsonFunction }>
  implements Repository<T>
{
  constructor(private readonly model: ModelMongoose<Model>) {}

  async save(permission: T): Promise<void> {
    const newPermission = permission.toJson();
    await this.model.create(newPermission);
  }

  async search<R>(criteria: Criteria): Promise<ResponseSearch<R>> {
    const { query, selectProperties, start, size, sortQuery } =
      MongoCriteriaConverter.Converter(criteria);

    const rows: R[] = await this.model
      .find(query)
      .select([...selectProperties, '-_id', '-__v'])
      .skip(start)
      .limit(size)
      .sort(sortQuery)
      .lean();

    const count: number = await this.model.find().countDocuments();
    return { rows, count };
  }

  searchById<R>(permissionId: Uuid): Promise<R> {
    return this.model
      .findOne({ id: permissionId.value })
      .select(['-_id', '-__v'])
      .lean();
  }

  update(permissionId: Uuid): Promise<void> {
    return this.model.findOneAndDelete({ id: permissionId.value });
  }

  remove(permissionId: Uuid): Promise<void> {
    return this.model.findOneAndDelete({ id: permissionId.value });
  }
}
