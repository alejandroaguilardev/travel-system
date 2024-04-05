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
          from: 'contract-detail',
          localField: 'details',
          foreignField: 'id',
          as: 'details',
        },
      },
      {
        $unwind: {
          path: '$details',
          preserveNullAndEmptyArrays: true,
        },
      },
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
        $lookup: {
          from: 'users',
          localField: 'adviser',
          foreignField: 'id',
          as: 'adviser',
        },
      },
      {
        $unwind: {
          path: '$adviser',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'pets',
          localField: 'details.pet',
          foreignField: 'id',
          as: 'pet',
        },
      },
      {
        $unwind: {
          path: '$pet',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          contractFields: { $first: '$$ROOT' },
          client: { $first: '$client' },
          adviser: { $first: '$adviser' },
          details: { $push: '$details' },
          pet: { $first: '$pet' },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              '$contractFields',
              {
                client: '$client',
                details: '$details',
                adviser: '$adviser',
                pet: '$pet',
              },
            ],
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
          'adviser._id': 0,
          'adviser.__v': 0,
          'adviser.createdAt': 0,
          'adviser.updatedAt': 0,
          'details._id': 0,
          'details.__v': 0,
          'details.createdAt': 0,
          'details.updatedAt': 0,
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
