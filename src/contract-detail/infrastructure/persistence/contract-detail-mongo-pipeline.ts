import { PipelineStage } from 'mongoose';

export class ContractDetailMongoPipeline {
  static executeById(id: string): PipelineStage[] {
    return [
      { $match: { id: { $eq: id } } },
      {
        $lookup: {
          from: 'pets',
          localField: 'pet',
          foreignField: 'id',
          as: 'pet',
        },
      },

      {
        $unwind: {
          path: '$pets',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          pets: { $first: '$$ROOT' },
          pet: { $push: '$pet' },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$pets', { pet: '$pet' }],
          },
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
          'pet._id': 0,
          'pet.__v': 0,
          'pet.createdAt': 0,
          'pet.updatedAt': 0,
          'cage._id': 0,
          'documentation._id': 0,
          'travel._id': 0,
        },
      },
    ];
  }
}
