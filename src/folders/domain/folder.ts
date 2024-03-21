import { Uuid } from '../../common/domain/value-object/uuid';
import { FolderInterface } from './interfaces/folder.interface';
import { FolderName } from './value-object/folder-name';
import { FolderQuantity } from './value-object/folder-quantity';
import { UuidOptional } from '../../common/domain/value-object/uuid-optional-value-object';

export class Folder {
  constructor(
    readonly id: Uuid,
    readonly name: FolderName,
    readonly quantity: FolderQuantity,
    readonly user: UuidOptional,
  ) {}

  toJson(): FolderInterface {
    return {
      id: this.id.value,
      name: this.name.value,
      quantity: this.quantity.value,
      user: this.user.value,
    };
  }
}
