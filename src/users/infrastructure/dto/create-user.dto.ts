import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateUserRequest } from '../../application/create/create-user-request';
import { Type } from 'class-transformer';
import { ProfileDto } from './profile.dto';
import { ProfileInterface } from '../../domain/interfaces/profile.interface';

export class UserCreatorDto implements CreateUserRequest {
  @IsUUID()
  id: string;
  @Type(() => ProfileDto)
  @ValidateNested()
  profile: ProfileInterface;
  @IsEmail({}, { message: 'No es un email válido' })
  email: string;
  @IsOptional()
  @IsString()
  password: string = '';
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  roles: string[] = [];
  @IsOptional()
  status?: string;
  @IsOptional()
  user?: string;
}
