import { IsString } from 'class-validator';

export class UploadImageDto {
  @IsString()
  name: string;
}
