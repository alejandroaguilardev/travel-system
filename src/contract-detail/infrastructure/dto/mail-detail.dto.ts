import { IsOptional, IsString } from 'class-validator';

export class MailDetailDto {
  @IsOptional()
  @IsString()
  message?: string;
}
