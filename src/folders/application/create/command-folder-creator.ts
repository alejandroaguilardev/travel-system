import { Folder } from '../../domain/folder';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { UuidOptional } from '../../../common/domain/value-object/uuid-optional-value-object';
import { FolderName } from '../../domain/value-object/folder-name';
import { FolderQuantity } from '../../domain/value-object/folder-quantity';
import { CreateFolderRequest } from './create-folder-request';

export class CommandCreatorFolder {
  static execute(folder: CreateFolderRequest, userId: string): Folder {
    return new Folder(
      new Uuid(folder.id),
      new FolderName(folder.name),
      new FolderQuantity(folder.quantity),
      new UuidOptional(folder?.user ?? userId ?? ''),
    );
  }
}
