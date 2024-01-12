import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UserCreatorRequest } from '../../application/create/create-user-request';

export class UserCreatorDto implements UserCreatorRequest {
  @IsUUID()
  id: string;
  @IsString({ message: 'No es un nombre válido' })
  name: string;
  @IsOptional()
  @IsString()
  secondName: string = '';
  @IsString()
  lastName: string;
  @IsOptional()
  @IsString()
  secondLastName: string = '';
  @IsEmail({}, { message: 'No es un email válido' })
  email: string;
  @IsOptional()
  @IsString()
  password: string = '';
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  roles: string[] = [];
}
