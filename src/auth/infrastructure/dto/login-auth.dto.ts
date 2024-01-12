import { IsEmail, IsString } from 'class-validator';
import { LoginUserRequest } from '../../application/login/login-user-request';

export class LoginAuthDto implements LoginUserRequest {
  @IsEmail()
  email: string;
  @IsString()
  password: string = '';
}
