import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateFolderRequest } from '../../application/create/create-folder-request';

export class CreateFolderDto implements CreateFolderRequest {
  @IsUUID()
  id: string;
  @IsString()
  name: string;
  @IsNumber()
  quantity: number;
  @IsOptional()
  @IsString()
  user: string;
}
