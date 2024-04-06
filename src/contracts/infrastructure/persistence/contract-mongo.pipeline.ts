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
      ...ContractMongoPipeline.lookup(),
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

  static executeById(id: string): PipelineStage[] {
    return [{ $match: { id: { $eq: id } } }, ...ContractMongoPipeline.lookup()];
  }

  private static lookup() {
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
        $unwind: '$details',
      },
      {
        $lookup: {
          from: 'pets',
          localField: 'details.pet',
          foreignField: 'id',
          as: 'details.pet',
        },
      },
      {
        $unwind: {
          path: '$details.pet',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          details: { $push: '$details' },
          contractFields: { $first: '$$ROOT' },
          client: { $first: '$client' },
          adviser: { $first: '$adviser' },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              '$contractFields',
              {
                client: '$client',
                adviser: '$adviser',
                details: '$details',
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
          'client.password': 0,
          'client.createdAt': 0,
          'client.updatedAt': 0,
          'adviser._id': 0,
          'adviser.__v': 0,
          'adviser.createdAt': 0,
          'adviser.updatedAt': 0,
          'adviser.password': 0,
          'details._id': 0,
          'details.__v': 0,
          'details.createdAt': 0,
          'details.updatedAt': 0,
          'details.pet._id': 0,
          'details.pet.__v': 0,
          'details.pet.createdAt': 0,
          'details.pet.updatedAt': 0,
          'details.cage._id': 0,
          'details.documentation._id': 0,
          'details.travel._id': 0,
        },
      },
    ];
  }
}
