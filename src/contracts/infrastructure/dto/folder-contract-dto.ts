import { IsString } from 'class-validator';
import { FolderUpdaterRequest } from '../../../contracts/application/update/folder-updater';

export class FolderContractDto implements FolderUpdaterRequest {
  @IsString()
  folder: string;
  @IsString()
  number: string;
}
