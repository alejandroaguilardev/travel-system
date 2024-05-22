import {
  IsArray,
  IsEmail,
  IsOptional,
  IsUUID,
  ValidateNested,
  IsBoolean,
  IsString,
} from 'class-validator';
import { CreateUserRequest } from '../../application/create/create-user-request';
import { Type } from 'class-transformer';
import { ProfileDto } from './profile.dto';
import { ProfileInterface } from '../../domain/interfaces/profile.interface';
import { UserAuthInterface } from '../../../users/domain/interfaces/user-auth.interface';
import { UserAuthDto } from './user-auth.dto';

export class UserCreatorDto implements CreateUserRequest {
  @IsUUID(undefined, { message: 'El identificador no es válido' })
  readonly id: string;
  @Type(() => ProfileDto)
  @ValidateNested()
  readonly profile: ProfileInterface;
  @IsEmail({}, { message: 'No es un email válido' })
  readonly email: string;
  @IsOptional()
  @IsArray({ message: 'Los roles no son un campo válido' })
  @IsUUID(undefined, {
    each: true,
    message: 'El identificador del rol no es válido',
  })
  readonly roles: string[] = [];
  @IsOptional()
  readonly status?: string;
  @IsOptional()
  readonly user?: string;
  @Type(() => UserAuthDto)
  @ValidateNested()
  readonly auth: UserAuthInterface;
  @IsOptional()
  @IsBoolean({ message: 'El check de asesor no es un valor válido' })
  readonly isAdvisor?: boolean;
  @IsOptional()
  @IsBoolean({ message: 'El check de doctor no es un valor válido' })
  readonly isDoctor: boolean;
  @IsOptional()
  @IsString({ message: 'El link de whatsApp, no es un link válido' })
  readonly linkWhatsApp: string;
}
