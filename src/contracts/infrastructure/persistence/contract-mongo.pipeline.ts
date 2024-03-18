import { PipelineStage } from 'mongoose';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { MongoCriteriaConverter } from '../../../common/infrastructure/mongo/mongo-criteria-converter';

export class ContractMongoPipeline {
  static execute(criteria: Criteria): PipelineStage[] {
    const { query, start, size, sortQuery } =
      MongoCriteriaConverter.converter(criteria);
    const sort = [];
    if (Object.keys(sortQuery).length > 0) {
      sort.push({ $sort: sortQuery });
    }

    return [
      {
        $lookup: {
          from: 'users',
          localField: 'client',
          foreignField: 'id',
          as: 'client',
        },
      },
      {
        $unwind: {
          path: '$client',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          contractFields: { $first: '$$ROOT' },
          client: { $first: '$client' }, // Usar $first para obtener solo el primer cliente
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$contractFields', { client: '$client' }],
          },
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
          'client._id': 0,
          'client.__v': 0,
          'client.createdAt': 0,
          'client.updatedAt': 0,
        },
      },
      {
        $match: query,
      },
      {
        $skip: start,
      },
      {
        $limit: size,
      },
      ...sort,
    ];
  }
}
