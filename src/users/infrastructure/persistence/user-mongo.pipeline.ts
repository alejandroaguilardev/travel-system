import { PipelineStage } from 'mongoose';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { MongoCriteriaConverter } from '../../../common/infrastructure/mongo/mongo-criteria-converter';

export class UserMongoPipeline {
  static execute(criteria: Criteria): PipelineStage[] {
    const { query, start, size, sortQuery } =
      MongoCriteriaConverter.Converter(criteria);

    const sort = [];
    if (Object.keys(sortQuery).length > 0) {
      sort.push({ $sort: sortQuery });
    }

    return [
      {
        $match: query,
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'roles',
          foreignField: 'id',
          as: 'roles',
        },
      },
      {
        $unwind: {
          path: '$roles',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'permissions',
          localField: 'roles.permissions',
          foreignField: 'id',
          as: 'roles.permissions',
        },
      },
      {
        $group: {
          _id: '$_id',
          userFields: { $first: '$$ROOT' },
          roles: { $push: '$roles' },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$userFields', { roles: '$roles' }],
          },
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
          password: 0,
          'roles._id': 0,
          'roles.__v': 0,
          'roles.createdAt': 0,
          'roles.updatedAt': 0,
          'roles.permissions._id': 0,
          'roles.permissions.__v': 0,
          'roles.permissions.createdAt': 0,
          'roles.permissions.updatedAt': 0,
          'auth._id': 0,
          'profile._id': 0,
        },
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
    return [
      { $match: { id: { $eq: id } } },
      {
        $lookup: {
          from: 'roles',
          localField: 'roles',
          foreignField: 'id',
          as: 'roles',
        },
      },
      {
        $unwind: {
          path: '$roles',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'permissions',
          localField: 'roles.permissions',
          foreignField: 'id',
          as: 'roles.permissions',
        },
      },
      {
        $group: {
          _id: '$_id',
          userFields: { $first: '$$ROOT' },
          roles: { $push: '$roles' },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$userFields', { roles: '$roles' }],
          },
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
          password: 0,
          'roles._id': 0,
          'roles.__v': 0,
          'roles.createdAt': 0,
          'roles.updatedAt': 0,
          'roles.permissions._id': 0,
          'roles.permissions.__v': 0,
          'roles.permissions.createdAt': 0,
          'roles.permissions.updatedAt': 0,
          'auth._id': 0,
          'profile._id': 0,
        },
      },
    ];
  }
}
