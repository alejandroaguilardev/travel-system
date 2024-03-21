import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FolderRepository } from '../../domain/folder.repository';
import { Folder } from '../../domain/folder';
import { FolderModel } from '../schema/folder.schema';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';

@Injectable()
export class MongoFolderRepository
  extends MongoRepository<FolderModel, Folder>
  implements FolderRepository
{
  constructor(@InjectModel(FolderModel.name) folderModel: Model<FolderModel>) {
    super(folderModel);
  }
}
