import {
  IsArray,
  IsEmail,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateUserRequest } from '../../application/create/create-user-request';
import { Type } from 'class-transformer';
import { ProfileDto } from './profile.dto';
import { ProfileInterface } from '../../domain/interfaces/profile.interface';
import { UserAuthInterface } from '../../../users/domain/interfaces/user-auth.interface';
import { UserAuthDto } from './user-auth.dto';

export class UserCreatorDto implements CreateUserRequest {
  @IsUUID()
  id: string;
  @Type(() => ProfileDto)
  @ValidateNested()
  profile: ProfileInterface;
  @IsEmail({}, { message: 'No es un email válido' })
  email: string;
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  roles: string[] = [];
  @IsOptional()
  status?: string;
  @IsOptional()
  user?: string;
  @Type(() => UserAuthDto)
  @ValidateNested()
  auth: UserAuthInterface;
}
