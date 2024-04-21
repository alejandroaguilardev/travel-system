import { IsString } from 'class-validator';
import { LoginUserRequest } from '../../application/login/login-user-request';

export class LoginAuthDto implements LoginUserRequest {
  @IsString()
  document: string;
  @IsString()
  documentNumber: string;
  @IsString()
  password: string;
}
