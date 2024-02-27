import { Injectable } from '@nestjs/common';
import { Model as ModelMongoose } from 'mongoose';
import { Criteria } from '../../domain/criteria/criteria';
import { MongoCriteriaConverter } from './mongo-criteria-converter';
import { ResponseSearch } from '../../domain/response/response-search';
import { Repository } from '../../domain/repository';
import { Uuid } from '../../domain/value-object/uuid';

interface ToJsonFunction {
  (): Record<string, any>;
}

@Injectable()
export class MongoRepository<Model, T extends { toJson: ToJsonFunction }>
  implements Repository<T>
{
  constructor(private readonly model: ModelMongoose<Model>) {}

  async save(data: T): Promise<void> {
    const newData = data.toJson();
    await this.model.create(newData);
  }

  async search<R>(criteria: Criteria): Promise<ResponseSearch<R>> {
    const { query, selectProperties, start, size, sortQuery } =
      MongoCriteriaConverter.converter(criteria);

    const rows: R[] = await this.model
      .find(query)
      .select([...selectProperties, '-_id', '-__v', '-createdAt', '-updatedAt'])
      .skip(start)
      .limit(size)
      .sort(sortQuery)
      .lean();

    const count: number = await this.count(criteria);
    return { rows, count };
  }

  searchById<R>(id: Uuid): Promise<R> {
    return this.model
      .findOne({ id: id.value })
      .select(['-_id', '-__v', '-createdAt', '-updatedAt'])
      .lean();
  }

  update(id: Uuid, data: T): Promise<void> {
    const updateData = data.toJson();
    return this.model.findOneAndUpdate({ id: id.value }, updateData);
  }

  remove(id: Uuid): Promise<void> {
    return this.model.findOneAndDelete({ id: id.value });
  }

  protected async count(criteria: Criteria): Promise<number> {
    const { query } = MongoCriteriaConverter.converter(criteria);

    const count: number = await this.model.find(query).countDocuments();
    return count;
  }
}
