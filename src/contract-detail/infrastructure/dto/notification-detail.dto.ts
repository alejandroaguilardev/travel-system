import { IsOptional, IsString } from 'class-validator';

export class NotificationDetailDto {
  @IsOptional()
  @IsString()
  message?: string;
}
