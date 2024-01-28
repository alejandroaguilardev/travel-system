import { PipelineStage } from 'mongoose';

export class RoleMongoPipeline {
  static execute(id: string): PipelineStage[] {
    return [
      { $match: { id: { $eq: id } } },
      {
        $lookup: {
          from: 'permissions',
          localField: 'permissions',
          foreignField: 'id',
          as: 'permissions',
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
          'permissions._id': 0,
          'permissions.__v': 0,
          'permissions.createdAt': 0,
          'permissions.updatedAt': 0,
        },
      },
    ];
  }
}
